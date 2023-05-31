import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login_Segister_page from "./srcs/pages/Login_Segister/Login_Segister_page";
import { Socket, io } from "socket.io-client";
import Index from "./srcs/pages/Index/Index";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login_Segister_page />} />
          <Route path="home" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
