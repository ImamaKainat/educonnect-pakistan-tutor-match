
const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');
const User = require('../models/User');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// @route   GET /api/tutors
// @desc    Get all tutors with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { subject, location, minPrice, maxPrice, minRating, search } = req.query;
    
    let query = {};
    
    // Apply filters if they exist
    if (subject) {
      query.subjects = { $in: [subject] };
    }
    
    if (location) {
      query.location = location;
    }
    
    if (minPrice || maxPrice) {
      query.hourlyRate = {};
      if (minPrice) query.hourlyRate.$gte = Number(minPrice);
      if (maxPrice) query.hourlyRate.$lte = Number(maxPrice);
    }
    
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }
    
    if (search) {
      // Get tutor user IDs that match the search term in name
      const users = await User.find({ 
        role: 'tutor',
        name: { $regex: search, $options: 'i' }
      });
      
      const userIds = users.map(user => user._id);
      
      // Extend query to search by name or subject
      query.$or = [
        { user: { $in: userIds } },
        { subjects: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Find tutors
    const tutors = await Tutor.find(query).populate('user', 'name avatar');
    
    // Format response
    const formattedTutors = tutors.map(tutor => ({
      id: tutor._id,
      name: tutor.user.name,
      avatar: tutor.user.avatar,
      subjects: tutor.subjects,
      location: tutor.location,
      hourlyRate: tutor.hourlyRate,
      rating: tutor.rating,
      totalReviews: tutor.totalReviews,
      isVerified: tutor.isVerified,
      about: tutor.about
    }));
    
    res.json(formattedTutors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/tutors/:id
// @desc    Get tutor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id).populate('user', 'name avatar');
    
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    
    // Get reviews
    const reviews = await Review.find({ tutor: tutor._id }).populate('student', 'name avatar');
    
    // Format reviews
    const formattedReviews = reviews.map(review => ({
      id: review._id,
      studentName: review.student.name,
      avatar: review.student.avatar,
      rating: review.rating,
      date: review.date,
      comment: review.comment
    }));
    
    // Format response
    const formattedTutor = {
      id: tutor._id,
      name: tutor.user.name,
      avatar: tutor.user.avatar,
      subjects: tutor.subjects,
      location: tutor.location,
      hourlyRate: tutor.hourlyRate,
      rating: tutor.rating,
      totalReviews: tutor.totalReviews,
      isVerified: tutor.isVerified,
      about: tutor.about,
      qualifications: tutor.qualifications,
      experience: tutor.experience,
      education: tutor.education,
      availability: tutor.availability,
      reviews: formattedReviews
    };
    
    res.json(formattedTutor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/tutors/review/:id
// @desc    Add review for tutor
// @access  Private
router.post('/review/:id', auth, async (req, res) => {
  try {
    // Check if tutor exists
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can leave reviews' });
    }
    
    // Check if already reviewed by this user
    const existingReview = await Review.findOne({
      tutor: tutor._id,
      student: req.user._id
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this tutor' });
    }
    
    // Create the review
    const { rating, comment } = req.body;
    
    const review = new Review({
      student: req.user._id,
      tutor: tutor._id,
      rating,
      comment
    });
    
    await review.save();
    
    // Update tutor's rating
    const allReviews = await Review.find({ tutor: tutor._id });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const newRating = totalRating / allReviews.length;
    
    tutor.rating = newRating;
    tutor.totalReviews = allReviews.length;
    await tutor.save();
    
    res.json({
      id: review._id,
      studentName: req.user.name,
      avatar: req.user.avatar,
      rating: review.rating,
      date: review.date,
      comment: review.comment
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
