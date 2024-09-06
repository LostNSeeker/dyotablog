const { Blog, upload } = require('../models/blogs'); // Import Blog model and upload middleware

// Handle blog post creation
exports.blogs_write = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message }); // Return error if upload fails
    }

    try {
      // Save blog post data to MongoDB with fixed image path
      const newBlog = new Blog({
        heading: req.body.heading,
        image: req.file.path.replace(/\\/g, '/'), // Replace backslashes with forward slashes
        content: req.body.content,
      });

      await newBlog.save();
      res.status(201).send(newBlog); // Send success response with the newly created blog
    } catch (error) {
      res.status(500).send({ message: 'Failed to create blog post' }); // Handle any server-side errors
    }
  });
};

// Handle fetching all blog posts
exports.blogs_get_all = async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    res.status(200).json(blogs); // Send the blogs as JSON to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' }); // Handle server-side errors
  }
};

exports.detail = async (req, res) => {
  const { id } = req.params; // Extract blog ID from request params

  try {
    const blog = await Blog.findById(id); // Find blog post by ID in the database

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' }); // Return 404 if no blog post is found
    }

    res.status(200).json(blog); // Send the blog post data as JSON to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog post' }); // Handle server-side errors
  }
};
