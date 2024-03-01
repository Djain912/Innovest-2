import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
const Context = createContext();
//context api used to supply data to any component

const Provider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem("Token"));
    const   [user1,setUser1] = useState("");

    const storeToken=(token)=>{
        setToken(token);
return localStorage.setItem("Token",token);
    }

    let isLoggedin = !!token;
    const LogoutUser = ()=>{
    setToken(null);
    return localStorage.removeItem("Token");
    }

    // jwt auth current usee logged data 
   const userAuth = async ()=>{
       try{
        const response = await fetch("http://localhost:9000/user",{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if(response.ok){
            const userData  = await response.json();
            // console.log({userData});
            setUser1(userData);
        }
       }catch(err){
           console.log(err);
       }
   }
    useEffect(()=>{
        userAuth();
    },[])

return <Context.Provider value={{isLoggedin,storeToken,LogoutUser,user1}}>{children}</Context.Provider>
}
// logout functionality


//use to delever all the data 

const DeleveryContext = ()=>{
    let data = useContext(Context);
    if(!data){
        throw new Error("Context API error");
    }
    return data;
}
export default Provider;
export {DeleveryContext};