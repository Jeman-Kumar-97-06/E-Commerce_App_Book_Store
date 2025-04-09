import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";

const CartItem = ({ci}) => {
    const [error,setError]         = useState(null);
    const {user}                   = useAuthContext();
    const [quantity,setQuantity]   = useState(ci.quantity);
    const {dispatch}               = useCartContext();

    const updateCart = async () => {
        if (!user) {
            setError("You must be logged in");
            return;
        }
        ci.quantity = Number(quantity);
        const resp = await fetch('/api/carts',{method:'PATCH',body:JSON.stringify(ci),headers:{"Content-Type":'application/json',"Authorization":`Bearer ${user.token}`}});
        const json = await resp.json()
        if (!resp.ok){
            setError(json.error);
        }
        else if (resp.ok){
            setError(null);
            dispatch({type:"UPDATE_CART",payload:ci});
        }
    }

    const deleteFromCart = async () => {
        if (!user) {
            setError("You must be logged in");
            return;
        }
        dispatch({type:"REMOVE_FROM_CART",payload:ci})
        // const resp = await fetch(`/api/carts/${ci._id}`,{method:"DELETE",headers:{"Authorization":`Bearer ${user.token}`}});
        // const json = await resp.json();
        // if (resp.ok){
        //     dispatch({type:"REMOVE_FROM_CART",payload:json});
        // }
    }

    return (
        <div
        className="flex items-center justify-between border-b py-4"
       >
       <div className="flex-1">
         <h2 className="text-xl font-semibold">{ci.prod_name}</h2>
         <p className="text-lg">₹{Number(ci.price)*Number(quantity)}</p>
       </div>
       <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e)=>{setQuantity(e.target.value)}}
                className="w-16 text-center border rounded-lg p-1 mx-4"
              />
       <button
         onClick={updateCart}
         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-3"
       >
        {error || 'Update'}
       </button>
       <button
         onClick={deleteFromCart}
         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
       >
        {error || 'Remove'}
       </button>
     </div>
    )
}

export default CartItem;