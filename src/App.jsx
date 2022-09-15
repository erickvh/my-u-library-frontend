import { useState } from "react";
import { Navigation } from "./Navigation";
import { LoginPage } from "./pages/LoginPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navigation />
    </div>
  );
}

export default App;
