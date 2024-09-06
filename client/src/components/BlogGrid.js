import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch all blogs from the backend
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/blog/'); // Adjust the URL to match your backend endpoint
        setBlogs(response.data);
        console.log(response.data); // Log the data to inspect the image path
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="blog">
            <h2>{blog.heading}</h2>
            {/* Ensure the image path is correct */}
            <img src={`http://localhost:5001/uploads/${blog.image}`}/>
            <p>{blog.content}</p>
            {/* Format and display the created date and time */}
            <p>
              Created on: {new Date(blog.createdAt).toLocaleDateString()} 
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogGrid;
