
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Tutor = require('../models/Tutor');
const auth = require('../middleware/auth');

// @route   GET /api/bookings
// @desc    Get user's bookings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let bookings;
    
    if (req.user.role === 'student') {
      // Get student bookings
      bookings = await Booking.find({ student: req.user._id })
        .populate({
          path: 'tutor',
          populate: { path: 'user', select: 'name avatar' }
        })
        .sort({ date: 1 });
    } else if (req.user.role === 'tutor') {
      // Get tutor bookings
      const tutorProfile = await Tutor.findOne({ user: req.user._id });
      
      if (!tutorProfile) {
        return res.status(404).json({ message: 'Tutor profile not found' });
      }
      
      bookings = await Booking.find({ tutor: tutorProfile._id })
        .populate('student', 'name avatar')
        .sort({ date: 1 });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Format response
    const formattedBookings = bookings.map(booking => {
      let formattedBooking = {
        id: booking._id,
        date: booking.date,
        time: booking.time,
        duration: booking.duration,
        subject: booking.subject,
        sessionType: booking.sessionType,
        notes: booking.notes,
        status: booking.status
      };
      
      if (req.user.role === 'student') {
        formattedBooking.tutor = {
          id: booking.tutor._id,
          name: booking.tutor.user.name,
          avatar: booking.tutor.user.avatar
        };
      } else {
        formattedBooking.student = {
          id: booking.student._id,
          name: booking.student.name,
          avatar: booking.student.avatar
        };
      }
      
      return formattedBooking;
    });
    
    res.json(formattedBookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/bookings/:tutorId
// @desc    Book a session with a tutor
// @access  Private
router.post('/:tutorId', auth, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can book sessions' });
    }
    
    // Check if tutor exists
    const tutor = await Tutor.findById(req.params.tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    
    // Create booking
    const { date, time, duration, subject, sessionType, notes } = req.body;
    
    const booking = new Booking({
      student: req.user._id,
      tutor: tutor._id,
      date,
      time,
      duration,
      subject,
      sessionType,
      notes
    });
    
    await booking.save();
    
    res.json({
      id: booking._id,
      date: booking.date,
      time: booking.time,
      duration: booking.duration,
      subject: booking.subject,
      sessionType: booking.sessionType,
      notes: booking.notes,
      status: booking.status,
      tutor: {
        id: tutor._id,
        name: tutor.user.name
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check authorization
    if (req.user.role === 'student' && booking.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    if (req.user.role === 'tutor') {
      const tutorProfile = await Tutor.findOne({ user: req.user._id });
      if (!tutorProfile || booking.tutor.toString() !== tutorProfile._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }
    
    // Update status
    booking.status = req.body.status;
    await booking.save();
    
    res.json({
      id: booking._id,
      status: booking.status
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
