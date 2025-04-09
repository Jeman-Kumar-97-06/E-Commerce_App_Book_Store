import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {login,error,isloading} = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email,password);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8e2a5] text-[#3b2f2f] p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>
        
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border rounded-lg w-full"
            value={email}
            onChange={e=>{setEmail(e.target.value)}}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border rounded-lg w-full"
            value={password}
            onChange={e=>{setPassword(e.target.value)}}
            required
          />
        
          <button type="submit" className="px-6 py-3 bg-[#8b5a2b] text-white rounded-lg shadow-lg hover:bg-[#6d4522]">
            Login
          </button>
          
          {!isloading || <div>Please wait. The server response is slow.😿</div>}
          {error && <div className='error'>{error}</div>}

        </form>

        <p className="text-center mt-4">
          Don't have an account?
          <Link to='/signup' className="text-[#8b5a2b] font-semibold hover:underline">
            Signup
          </Link>
        </p>
      
      </motion.div>
    
    </div>
  );
};

export default LoginPage;
