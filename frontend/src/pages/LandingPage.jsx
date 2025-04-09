import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LandingPage = ({onFinish}) => {
  const [animateExit,setAnimateExit] =  useState(false);
  const navigate  = useNavigate();
  
  const handleEnter = () => {
    setAnimateExit(true);
    setTimeout(() => {
      navigate("/login"); // Navigate to login page after animation
    }, 1000);
  }
  return (
    <motion.div animate={animateExit ? { y: "-100vh", opacity: 0 } : { y: 0, opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen bg-[#f8e2a5] text-[#3b2f2f] p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold"
      >
        Welcome to Book Store
      </motion.h1>
      <p className="mt-4 text-lg text-center max-w-lg">
        Discover a world of knowledge and adventure. Browse through our curated collection of books and find your next favorite read.
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6"
      >
        <Link onClick={handleEnter} className="px-6 py-3 text-lg bg-[#8b5a2b] text-white rounded-lg shadow-lg hover:bg-[#6d4522]">
            Get Started
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
