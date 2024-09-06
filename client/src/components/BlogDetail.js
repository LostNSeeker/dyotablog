import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/blog/${id}`); // Correct endpoint
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch blog');
        setLoading(false);
      }
    };
  
    fetchBlog();
  }, [id]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {blog ? (
        <div className="blog mb-6 p-4 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">{blog.heading}</h2>
          <img
            src={`http://localhost:5001/uploads/${blog.image}`}
            alt={blog.heading}
            className="w-full h-auto mb-4 rounded"
          />
          <p className="text-gray-700 mb-4">{blog.content}</p>
          <p className="text-gray-500 text-sm">
            Created on: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Blog not found</p>
      )}
    </div>
  );
};

export default BlogDetail;
