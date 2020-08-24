import React, { useState, createContext } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Context.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
