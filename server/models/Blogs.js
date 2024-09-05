const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads with a size limit of 2MB
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder where the images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  }
});

// 2MB limit for image files
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, or .png files are allowed!'));
    }
  }
}).single('image'); // Expecting the form field name to be 'image'

// Define the Blog schema
const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // Store the image path or URL as a string
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Blog model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = {
  Blog,
  upload,
};
