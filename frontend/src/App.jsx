import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import ProductsPage from './pages/HomePage'
import AuthPage from './pages/Signup'
import SignupPage from './pages/Signup'
import LoginPage from './pages/LoginPage'
import { useAuthContext } from './hooks/useAuthContext'
import { BrowserRouter, Navigate, Routes,Route } from 'react-router-dom'
import CartPage from './pages/CartPage'

function App() {
  const {user} = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={user ? <ProductsPage/> : <LandingPage/>}/>
          <Route exact path='/login' element={!user ? <LoginPage/> : <Navigate to='/'/>}/>
          <Route exact path='/signup' element={!user ? <SignupPage/> : <Navigate to='/'/>}/>
          <Route exact path='/cart' element={user ? <CartPage/> : <Navigate to='/'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
