const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const urlRoutes = require('./routes/url');

// Initialize express app
const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS (allows frontend to make requests)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// ============================================
// DATABASE CONNECTION
// ============================================

const MONGO_URI = 'mongodb+srv://linksnap:linksnap123@cluster0.5lqernu.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// ============================================
// ROUTES
// ============================================

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'LinkSnap API is running!' });
});

// URL routes
app.use('/api/url', urlRoutes);

// ============================================
// START SERVER
// ============================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});