import React, { Component } from "react";

import { AuthProvider } from "./auth";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Menu } from "./components/Menu";

function Navigation() {
  return (
    <HashRouter>
      <AuthProvider>
        <Menu />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LoginPage />} />
          <Route path="/my-books" element={<HomePage />}></Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export { Navigation };
