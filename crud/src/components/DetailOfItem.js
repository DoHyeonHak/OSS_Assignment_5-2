import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DetailOfItem = () => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // reference : https://www.daleseo.com/react-hooks-use-effect/
  useEffect(() => {
    fetch(`https://672883cb270bd0b97555dbc6.mockapi.io/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div className="container">
      <h2>Detail of Item</h2>
      <div className="row mb-2">
        <div>Name: {currentProduct.name}</div>
        <div>Price: ${currentProduct.price}</div>
        <div>Stock: {currentProduct.stock}</div>
        <div>Category: {currentProduct.category}</div>
      </div>
      <Link to="/list" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default DetailOfItem;
