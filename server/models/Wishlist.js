
const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor'
  }]
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
