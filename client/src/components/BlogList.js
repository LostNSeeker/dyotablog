import React from 'react';

const BlogList = () => {
  const posts = [
    {
      title: 'UX review presentations',
      author: 'Olivia Rhye',
      date: '20 Jan 2024',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      tags: ['Design', 'Research', 'Presentation'],
      image: 'image-url-1.jpg',
    },
    {
      title: 'Migrating to Linear 101',
      author: 'Phoenix Baker',
      date: '19 Jan 2024',
      description: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.',
      tags: ['Product', 'Tools', 'SaaS'],
      image: 'image-url-2.jpg',
    },
    {
      title: 'Building your API stack',
      author: 'Lana Steiner',
      date: '18 Jan 2024',
      description: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
      tags: ['Software Development', 'Tools'],
      image: 'image-url-3.jpg',
    },
  ];

  return (
    <section className="latest-writings">
      <div className="header">
        <h2>Latest writings</h2>
        <p>The latest news, technologies, and resources from our team.</p>
        <a href="/all-posts" className="view-all-btn">View all posts</a>
      </div>
      <div className="posts-container">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-content">
              <span className="post-meta">
                {post.author} • {post.date}
              </span>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.description}</p>
              <div className="post-tags">
                {post.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
