import React, { useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Context } from "../context/context";

const Layout = ({ children }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(Context);

  return (
    <>
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
