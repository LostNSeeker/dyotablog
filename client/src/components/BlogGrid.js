import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogGrid = () => {
    const [blogs, setBlogs] = useState([]);

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
    }, []);

    return (
        <section className="blog-grid-section">
            <div className="header">
                <h2>All Blogs</h2>
                <p>The latest news, technologies, and resources from our team.</p>
            </div>
            <div className="blog-grid-container">
                {blogs.length === 0 ? (
                    <p>No blogs available</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog._id} className="blog-card">
                            <img
                                src={`http://localhost:5001/uploads/${blog.image}`}
                                alt={blog.heading}
                                className="blog-image"
                            />
                            <div className="blog-content">
                <span className="blog-meta">
                  {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                                <h3 className="blog-title">{blog.heading}</h3>
                                <p className="blog-description">
                                    {blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
                                </p>
                                <div className="blog-tags">
                                    {blog.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default BlogGrid;
