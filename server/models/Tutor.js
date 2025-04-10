
const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  hourlyRate: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  qualifications: [{
    type: String
  }],
  experience: {
    type: String
  },
  education: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  availability: [{
    day: String,
    slots: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tutor', TutorSchema);
