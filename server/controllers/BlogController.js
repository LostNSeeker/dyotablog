const { Blog, upload } = require('../models/blogs'); // Import Blog model and upload middleware

exports.blogs_write = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message }); // Return error if upload fails
    }

    try {
      // Save blog post data to MongoDB
      const newBlog = new Blog({
        heading: req.body.heading,
        image: req.file.path, // Store the image path in the database
        content: req.body.content,
      });

      await newBlog.save();
      res.status(201).send(newBlog); // Send success response with the newly created blog
    } catch (error) {
      res.status(500).send({ message: 'Failed to create blog post' }); // Handle any server-side errors
    }
  });
};
