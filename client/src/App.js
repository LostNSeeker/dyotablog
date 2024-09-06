import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogCard from "./components/BlogCard";
import ArticleGrid from "./components/ArticleGrid";
import BlogForm from "./components/BlogForm"
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import ResetPassword from "./auth/ResetPassword";
import BlogGrid from "./components/BlogGrid";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
            <BlogGrid/>
              <Navbar />
              <Hero />
              <ArticleGrid />
              <BlogList />
              <BlogCard />
              <Footer />
            </>
          } />
          <Route path="/Blog-form" element={<BlogForm/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
