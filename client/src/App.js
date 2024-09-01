import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogCard from "./components/BlogCard";
import ArticleGrid from "./components/ArticleGrid";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import ResetPassword from "./auth/ResetPassword";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <ArticleGrid />
              <BlogList />
              <BlogCard />
              <Footer />
            </>
          } />
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
