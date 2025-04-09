import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { ProductsContextProvider } from './contexts/ProductsContext.jsx'
import { CartContextProvider } from './contexts/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <App />
          </CartContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
