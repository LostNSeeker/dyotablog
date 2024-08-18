import React from 'react';

const articles = [
  {
    title: 'Migrating to Linear 101',
    author: 'Phoenix Baker',
    date: '19 Jan 2024',
    description: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.',
    tags: ['Product', 'Tools', 'SaaS'],
    image: 'image-url-1.jpg',
  },
  {
    title: 'Building your API stack',
    author: 'Lana Steiner',
    date: '18 Jan 2024',
    description: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    tags: ['Software Development', 'Tools'],
    image: 'image-url-2.jpg',
  },
  {
    title: 'Bill Walsh leadership lessons',
    author: 'Alec Whitten',
    date: '17 Jan 2024',
    description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?',
    tags: ['Leadership', 'Management'],
    image: 'image-url-3.jpg',
  },
  {
    title: 'PM mental models',
    author: 'Demi Wilkinson',
    date: '16 Jan 2024',
    description: 'Mental models are simple expressions of complex processes or relationships.',
    tags: ['Product', 'Research', 'Frameworks'],
    image: 'image-url-4.jpg',
  },
  {
    title: 'What is wireframing?',
    author: 'Candice Wu',
    date: '15 Jan 2024',
    description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
    tags: ['Design', 'Research'],
    image: 'image-url-5.jpg',
  },
  {
    title: 'How collaboration makes us better designers',
    author: 'Natali Craig',
    date: '14 Jan 2024',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    tags: ['Design', 'Research'],
    image: 'image-url-6.jpg',
  },
];

const ArticleGrid = () => {
  return (
    <section className="article-grid">
      <div className="articles-container">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <img src={article.image} alt={article.title} className="article-image" />
            <div className="article-content">
              <span className="article-meta">
                {article.author} • {article.date}
              </span>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-description">{article.description}</p>
              <div className="article-tags">
                {article.tags.map((tag, tagIndex) => (
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

export default ArticleGrid;
