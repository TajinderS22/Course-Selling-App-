import React, { createContext, useState } from "react";
import useBreakpoint from "../hooks/useBreakpoint";

export const AppContext = createContext("");

export const AppProvider = ({ children }) => {
  const [onSignup, setOnSignup] = useState(true);
  const [authenticationMessage, setAuthenticationMessage] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const isMdUp = useBreakpoint();
  const [open, setOpen] = useState(isMdUp);
  const contextData = {
    onSignup,
    setOnSignup,
    authenticationMessage,
    setAuthenticationMessage,
    isCreator,
    setIsCreator,
    open,
    setOpen,
  };
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};
