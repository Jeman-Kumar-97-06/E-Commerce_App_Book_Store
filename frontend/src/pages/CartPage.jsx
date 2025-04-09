import React from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from '../hooks/useCartContext';
import { useEffect } from "react";
import CartItem from "../components/CartItem";

const CartPage = () => {

  const {user} = useAuthContext();
  const {cart_items:cartItems,dispatch} = useCartContext();

  useEffect(()=>{
    const fetchCart = async () => {
        const resp = await fetch('https://e-commerce-backend-9p74.onrender.com/api/carts',{headers:{'Authorization':`Bearer ${user.token}`}});
        const cart = await resp.json();
        if (resp.ok) {
            dispatch({type:"SET_CART_ITEMS",payload:cart.resps});
        }
    }
    if (user) {
        fetchCart();
    }
  },[dispatch,user]) 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#f8e2a5] text-[#3b2f2f] p-6"
    >
      <h1 className="text-4xl font-bold text-center mb-6">Your Cart</h1>
      {!cartItems ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          {!cartItems && 
              <div className="flex items-center justify-center min-h-screen bg-[#f8e2a5] text-[#3b2f2f]">
                <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                  <p className="text-xl font-semibold">Please wait. The server response is slow. 😿</p>
                </div>
              </div>
          }
          {cartItems && cartItems.map((item, index) => (
            <CartItem ci={item} key={index}/>
          ))}
          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold mb-3">Total: ₹ {cartItems && cartItems.reduce((total,itm)=>total+Number(itm.price)*Number(itm.quantity),0)}</h2>
            <button
              className="bg-[#8b5a2b] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#6d4522]"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
