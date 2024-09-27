import React from 'react';

const Reviews = () => {
  return (
    <section className="join-startups-section">
      <div className="content">
        <h2>Join 4,000+ startups growing with Untitled</h2>
        <p>Start your 30-day free trial today.</p>
        <div className="buttons">
          <button className="btn learn-more">Learn more</button>
          <button className="btn get-started">Get started</button>
        </div>
      </div>
      <div className="testimonial">
        <img
          src="testimonial-image-url.jpg"
          alt="Alisa Hester"
          className="testimonial-image"
        />
        <div className="testimonial-content">
          <p className="testimonial-quote">
            “Untitled has saved us thousands of hours of work. We’re able to spin up projects and features faster.”
          </p>
          <p className="testimonial-author">Alisa Hester</p>
          <p className="testimonial-role">
            PM, Hourglass<br />
            Web Design Agency
          </p>
          <div className="testimonial-rating">★★★★★</div>
          <div className="testimonial-nav">
            <button className="nav-btn prev">←</button>
            <button className="nav-btn next">→</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
