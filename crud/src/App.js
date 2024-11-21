import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ShowProducts from "./components/ShowProducts";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import DetailOfItem from "./components/DetailOfItem";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list" element={<ShowProducts />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="update/:id" element={<UpdateProduct />} />
          <Route path="detail/:id" element={<DetailOfItem />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
