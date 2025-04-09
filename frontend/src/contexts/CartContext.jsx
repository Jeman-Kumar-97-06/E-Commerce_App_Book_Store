import { createContext,useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state,action) => {
    switch(action.type) {
        case "SET_CART_ITEMS":
            return {
                cart_items : action.payload
            }
        case "REMOVE_FROM_CART":
            return {
                cart_items : state.cart_items.filter(itm => itm.prod_name !== action.payload.prod_name)
            }
        case "UPDATE_CART":
            // get the item to be updated
            const item_upd  = state.cart_items.filter(itm => itm._id === action.payload._id);
            // get that item's index
            const item_indx = state.cart_items.indexOf(item_upd[0]);
            // replace that item with the updated item/ item count
            state.cart_items.splice(item_indx,1,action.payload);
            return {
                 cart_items : state.cart_items
            };
        default:
            return state;
    }
}

export const CartContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(cartReducer,{cart_items:null});
    return (
        <CartContext.Provider value={{...state,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}