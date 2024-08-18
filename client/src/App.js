import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList"
import BlogCard from "./components/BlogCard"
import ArticleGrid from "./components/ArticleGrid"


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>
      <ArticleGrid/>
      <BlogList/>
      <BlogCard/>
      <Footer/>
    </div>
  );
}

export default App;
