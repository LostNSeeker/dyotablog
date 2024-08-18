import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="blog-section">
        <div className="blog-header">
          <span className="blog-tag">Our blog</span>
          <h1 className="blog-title">Resources and insights</h1>
          <p className="blog-subtitle">
            The latest industry news, interviews, technologies, and resources.
          </p>
          <form className="email-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
            />
            <button type="submit" className="email-button">
              Get started
            </button>
          </form>
          <p className="privacy-policy">
            We care about your data in our{" "}
            <a href="/privacy-policy">privacy policy</a>.
          </p>
        </div>
        <div className="blog-image-container">
          <img
            src=""
            alt="Discussion"
            className="blog-image"
          />
          <p className="image-caption">Olivia Rhye • 20 Jan 2024</p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
