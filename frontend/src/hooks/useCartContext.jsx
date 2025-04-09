import {useContext} from 'react';
import {CartContext} from '../contexts/CartContext';

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context){
        throw Error("useCartContext can only be used inside components with access to Cart Context");
    }
    return context;
}