import React from "react";
import Header from "./Navbar";
import BlogList from "./BlogList";

function HomePage() {
  return (
    <div>
      <Header />
      <div className="hero-section">
        <h2>Dyota</h2>
        <p>
          Tool and strategies modern teams need to help their companies grow.
        </p>
        <input type="email" placeholder="Enter your email" />
        <button>Get started</button>
      </div>
      <BlogList />
    </div>
  );
}

export default HomePage;
