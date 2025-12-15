const mongoose = require('mongoose');

// Define schema for URL documents
const urlSchema = new mongoose.Schema({
  // The original long URL
  originalUrl: {
    type: String,
    required: true
  },
  // Short code (e.g., "abc123")
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  // Total click count
  clicks: {
    type: Number,
    default: 0
  },
  // Array to store each click with timestamp
  clickHistory: [{
    date: {
      type: Date,
      default: Date.now
    }
  }],
  // When the URL was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model
module.exports = mongoose.model('Url', urlSchema);