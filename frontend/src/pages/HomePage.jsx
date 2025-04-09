import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductDetails from "../components/ProductDetail";

const ProductsPage = () => {

  const {products,dispatch} = useProductsContext();
  const {user}              = useAuthContext();

  useEffect(()=>{
    const fetchAllProds = async () => {
      const resp  = await fetch('https://e-commerce-backend-9p74.onrender.com/api/products',{headers:{"Authorization":`Bearer ${user.token}`}});
      const prods = await resp.json();
      if (resp.ok) {
        dispatch({type:"SET_PRODS",payload:prods});
      }
    }
    if (user) {
      fetchAllProds();
    }
  },[dispatch,user])

  const handlePLtoH = () => {
    dispatch({type:"SORT_BY_PRICE_L_H"})
  }

  const handlePHtoL = () => {
    dispatch({type:"SORT_BY_PRICE_H_L"})
  }

  const handleByName = () => {
    dispatch({type:"SORT_BY_NAME"});
  }

  const handleFeatured = async () => {
        const resp  = await fetch('https://e-commerce-backend-9p74.onrender.com/api/products',{headers:{"Authorization":`Bearer ${user.token}`}});
        const prods = await resp.json();
        if (resp.ok) {
            dispatch({type:"SET_PRODS",payload:prods});
        }
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#f8e2a5] text-[#3b2f2f] p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-6"
      >
        Our Collection
      </motion.h1>
      <select name="sort_ops" id="sort_ops" className="px-4 py-2 bg-[#8b5a2b] text-white rounded-lg hover:bg-[#6d4522] mb-3">
        <option onClick={handleFeatured}>Sort By</option>
        <option onClick={handleByName}>By Name</option>
        <option onClick={handlePLtoH}>By Price : Low to High</option>
        <option onClick={handlePHtoL}>By Price : High to Low</option>
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!products && <div className="flex items-center justify-center min-h-screen bg-[#f8e2a5] text-[#3b2f2f]">
                        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                          <p className="text-xl font-semibold">Please wait. The server response is slow. 😿</p>
                        </div>
                      </div>}
        {products && products.map((product) => (
         <ProductDetails product={product} key={product._id} />
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductsPage;