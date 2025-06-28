import React,{ createContext, useState } from "react";

export const AppContext=createContext("")

export const AppProvider=({children})=>{
    const [onSignup,setOnSignup]=useState(true)
    const [authenticationMessage,setAuthenticationMessage]=useState(null)
    const contextData={
        onSignup,setOnSignup,
        authenticationMessage,setAuthenticationMessage
    }
    return(
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    )
}