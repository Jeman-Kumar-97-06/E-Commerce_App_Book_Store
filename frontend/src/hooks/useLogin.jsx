import {useState} from 'react';
import {useAuthContext} from './useAuthContext';

export const useLogin = () => {
    const [error,setError] = useState(null);
    const [isloading,setIsloading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (email,password) => {
        setIsloading(true);
        setError(null);
        const resp = await fetch('https://e-commerce-backend-9p74.onrender.com/api/users/login',{method:"POST",
                                                     headers:{"Content-Type":"application/json"},
                                                     body:JSON.stringify({email,password})});
        const json = await resp.json();
        if (!resp.ok){
            setIsloading(false);
            setError(json.error);
        }
        if (resp.ok){
            localStorage.setItem('ecomuser',JSON.stringify(json));
            dispatch({type:"LOGIN",payload:json});
            setIsloading(false);
        };
    }
    return {login,error,isloading};
}