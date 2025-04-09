import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";

const ProductDetails = ({product}) => {
    const {user}                 = useAuthContext();
    const [quantity,setQuantity] = useState(1);
    const [error,setError]       = useState(null);
    const handleAdd = async (e) => {
        e.preventDefault()
        const pt  = {};
        pt[product.title] = quantity;
        const resp = await fetch('https://e-commerce-backend-9p74.onrender.com/api/carts',{method:"POST",
                                               headers:{"Content-Type":"application/json",'Authorization':`Beared ${user.token}`},
                                               body:JSON.stringify({pt})
                                               })
        const json = await resp.json();
        if(!resp.ok){
            setError(json.error);
            window.alert(error);
        }
        if(resp.ok){
           setError(null);
        }
        setQuantity(1)
    }
    return (
        <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg shadow-lg"
        >
            <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-contain rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
            <h3 className='text-lg mt-2'>{product.author}</h3>
            <p className="text-lg font-bold">₹{product.price}</p>
            <form onSubmit={handleAdd} className='add_cart_form'> 
                <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e)=>{setQuantity(e.target.value)}}
                className="w-16 text-center border rounded-lg p-1 mx-4"
                />
                
                <button>Add to Cart</button>
            </form>
            <button onClick={handleAdd} className="mt-4 bg-[#8b5a2b] text-white px-4 py-2 rounded-lg hover:bg-[#6d4522]">
                Add to Cart
            </button>
        </motion.div>
        // <div className="card">
        //     <div className="prod_image">
        //         <img src={prod.img} alt="Product" styles={{"width":"100%"}}/>
        //     </div>
        //     <div className="prod_dets">
        //         <span><h4>{prod.title}</h4></span>
        //         <span className="prod_author">{prod.author}</span>
        //         <p className="price">₹ {prod.price}</p>
        //         <form onSubmit={handleAdd} className='add_cart_form'> 
        //             <input type='number' value={quantity} onChange={e=>{setQuantity(quantity+1)}}/>
        //             <button>Add to Cart</button>
        //         </form>
        //     </div>
        // </div>
    )
};

export default ProductDetails;