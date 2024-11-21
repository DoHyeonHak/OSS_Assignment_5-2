import React from "react";
import ReactDOM from "react-dom/client";
import CRUDproduct from "./components/CRUDproduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<CRUDproduct />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
