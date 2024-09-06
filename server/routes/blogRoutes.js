const express = require('express');
const { blogs_write, blogs_get_all,detail } = require('../controllers/BlogController');

const router = express.Router();

// Route for creating a new blog post with image upload
router.post('/', blogs_write); // Just '/' because it will be mounted on '/blog'
router.get('/', blogs_get_all);
router.get('/:id', detail);
module.exports = router;
