import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {

  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');

  const {signup,error,isloading} = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name,email,password)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8e2a5] text-[#3b2f2f] p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Signup
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSignup}>
          <input
              type="text"
              name="username"
              placeholder="Username"
              value={name}
              onChange={e=>{setName(e.target.value)}}
              className="p-3 border rounded-lg w-full"
              required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e=>{setEmail(e.target.value)}}
            className="p-3 border rounded-lg w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e=>{setPassword(e.target.value)}}
            className="p-3 border rounded-lg w-full"
            required
          />
          <button type="submit" className="px-6 py-3 bg-[#8b5a2b] text-white rounded-lg shadow-lg hover:bg-[#6d4522]">
            Signup
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?
          <Link to='/login' className="text-[#8b5a2b] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
