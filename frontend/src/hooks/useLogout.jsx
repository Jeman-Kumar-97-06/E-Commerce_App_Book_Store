import { useAuthContext } from "./useAuthContext";
import {useProductsContext} from './useProductsContext';

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch:prodContext} = useProductsContext();
    const logout = () => {
        localStorage.removeItem('ecomuser');
        dispatch({type:"LOGOUT"});
        prodContext({type:"SET_PRODS",payload:null});
    }
    return {logout};
};