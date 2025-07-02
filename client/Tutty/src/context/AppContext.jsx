import React,{ createContext, useState } from "react";
import useBreakpoint from "../hooks/useBreakpoint";

export const AppContext=createContext("")

export const AppProvider=({children})=>{
    const [onSignup,setOnSignup]=useState(true)
    const [authenticationMessage,setAuthenticationMessage]=useState(null)
    const [isAdmin,setIsAdmin]=useState(false)
    const isMdUp = useBreakpoint();
    const [open, setOpen] = useState(isMdUp);
    const contextData={
        onSignup,setOnSignup,
        authenticationMessage,setAuthenticationMessage,
        isAdmin,setIsAdmin,
        open,setOpen
    }
    return(
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    )
}