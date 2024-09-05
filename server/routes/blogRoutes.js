const express = require('express');
const { blogs_write } = require('../controllers/BlogController'); // Import the blogs_write controller
const router = express.Router();

// Route for creating a new blog post with image upload
router.post('/', blogs_write); // Just '/' because it will be mounted on '/blog'

module.exports = router;
