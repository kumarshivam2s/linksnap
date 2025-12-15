const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// ============================================
// ROUTE 1: Create a new short URL
// POST /api/url/shorten
// ============================================
router.post('/shorten', async (req, res) => {
  // Get original URL from request body
  const { originalUrl } = req.body;

  // Validate URL
  if (!originalUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Generate a unique 6-character short code
    const shortCode = nanoid(6);

    // Create new URL document
    const url = new Url({
      originalUrl,
      shortCode
    });

    // Save to database
    await url.save();

    // Send response
    res.status(201).json(url);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// ROUTE 2: Get all URLs
// GET /api/url/all
// ============================================
router.get('/all', async (req, res) => {
  try {
    // Find all URLs, sorted by newest first
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// ROUTE 3: Get single URL stats
// GET /api/url/stats/:shortCode
// ============================================
router.get('/stats/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json(url);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// ROUTE 4: Redirect to original URL
// GET /api/url/:shortCode
// ============================================
router.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count
    url.clicks += 1;

    // Add click to history with current timestamp
    url.clickHistory.push({ date: new Date() });

    // Save changes
    await url.save();

    // Redirect to original URL
    res.redirect(url.originalUrl);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// ROUTE 5: Delete a URL
// DELETE /api/url/:shortCode
// ============================================
router.delete('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({ message: 'URL deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;