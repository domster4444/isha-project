import React from "react";

import { Layouts } from "./Layout.style";

import Nav from "components/Nav";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <Layouts>
      <Nav />

      {children}

      <ToastContainer />
    </Layouts>
  );
};

export default Layout;
