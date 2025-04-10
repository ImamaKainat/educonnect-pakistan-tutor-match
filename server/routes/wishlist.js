
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Tutor = require('../models/Tutor');
const auth = require('../middleware/auth');

// @route   GET /api/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can have wishlists' });
    }
    
    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ student: req.user._id });
    
    if (!wishlist) {
      wishlist = new Wishlist({ student: req.user._id, tutors: [] });
      await wishlist.save();
    }
    
    // Get tutor details
    const tutors = await Tutor.find({ _id: { $in: wishlist.tutors } }).populate('user', 'name avatar');
    
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

// @route   POST /api/wishlist/:tutorId
// @desc    Add/remove tutor from wishlist
// @access  Private
router.post('/:tutorId', auth, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can have wishlists' });
    }
    
    // Check if tutor exists
    const tutor = await Tutor.findById(req.params.tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    
    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ student: req.user._id });
    
    if (!wishlist) {
      wishlist = new Wishlist({ student: req.user._id, tutors: [] });
    }
    
    // Check if tutor is already in wishlist
    const tutorIndex = wishlist.tutors.findIndex(
      id => id.toString() === req.params.tutorId
    );
    
    let message;
    
    if (tutorIndex === -1) {
      // Add to wishlist
      wishlist.tutors.push(req.params.tutorId);
      message = 'Tutor added to wishlist';
    } else {
      // Remove from wishlist
      wishlist.tutors.splice(tutorIndex, 1);
      message = 'Tutor removed from wishlist';
    }
    
    await wishlist.save();
    
    res.json({ 
      message,
      wishlist: wishlist.tutors
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
