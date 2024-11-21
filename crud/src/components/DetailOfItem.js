import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const DetailOfItem = () => {
  const { id } = useParams(); // 아이디를 가져온다.

  const [currentProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  fetch(`https://672883cb270bd0b97555dbc6.mockapi.io/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentProduct),
  });

  return (
    <div className="container">
      <h2>Detail Of Item</h2>
      <div className="row mb-2" key={currentProduct}>
        <div className="col">Name: {currentProduct.name}</div>
        <div className="col">Price: ${currentProduct.price}</div>
        <div className="col">Stock: {currentProduct.stock}</div>
        <div className="col">Category: {currentProduct.category}</div>
      </div>
      <Link to="/list" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default DetailOfItem;
