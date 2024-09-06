import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState(''); // State for storing the username

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/blog/');
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // Sort by createdAt in descending order
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();

    // Fetch username from localStorage or session (example usage)
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      setUsername('Guest'); // Default username if none is set
    }
  }, []);

  return (
    <div className="p-4">
      {/* Display the username */}
      <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
      <h2 className="text-xl font-bold mb-4">All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="block mb-6 p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{blog.heading}</h2>
            <img
              src={`http://localhost:5001/uploads/${blog.image}`}
              alt={blog.heading}
              className="w-full h-auto mb-4 rounded"
            />
            <p className="text-gray-700 mb-2">
              {blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
            </p>
            {/* Add "Read More" Link */}
            <a
              href={`http://localhost:3000/blog/${blog._id}`} // Link to the blog detail page
              target="_blank" // Open in new tab
              rel="noopener noreferrer" // Security measure
              className="text-blue-500 hover:underline"
            >
              Read More
            </a>
            {/* Format and display the created date and time */}
            <p className="text-gray-500 text-sm mt-2">
              Created on: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogGrid;
