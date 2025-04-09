import { useReducer,createContext } from "react";

export const ProductsContext = createContext();

export const productsReducer = (state,action) => {
    switch(action.type){
        case "SET_PRODS":
            return {products:action.payload};
        case "CREATE_PRODS":
            return {products:[action.payload,...state.products]};
        // case "CATEGORIZE":
        //     let categorized = [];
        //     for (var x of state.products){
        //         if (x.category === action.payload){
        //             categorized.push(x);
        //         }
        //     }
        //     console.log(categorized)
        //     console.log(state.products)
        //     return {products:categorized}
        case "SORT_BY_NAME":
            state.products.sort((a, b) => {
                if (a.title < b.title) {
                  return -1;
                }
                if (a.title > b.title) {
                  return 1;
                }
                return 0;
              });
            return {products:state.products};
        case "SORT_BY_PRICE_L_H":
            state.products.sort((a,b)=>{return a.price-b.price})
            return {products:state.products};
        case "SORT_BY_PRICE_H_L":
            state.products.sort((a,b)=>{return b.price-a.price});
            return {products:state.products};
        default:
            return state;
    }
}

export const ProductsContextProvider = ({children}) => {

    const [state,dispatch] = useReducer(productsReducer,{products:null})
    
    return (
        <ProductsContext.Provider value={{...state,dispatch}}>
            {children}
        </ProductsContext.Provider>
    )
}