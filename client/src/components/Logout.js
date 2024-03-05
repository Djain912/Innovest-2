import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { DeleveryContext } from "../store.js";
function Logout(){
    const {LogoutUser} = DeleveryContext();
    useEffect(() => {
        LogoutUser();
    },[LogoutUser])

    return(
        <Navigate to={"/"} />
    )
}
 

export default Logout;