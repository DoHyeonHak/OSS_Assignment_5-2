import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateProduct = () => {
  const { id } = useParams(); // 아이디를 가져온다.

  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const navigate = useNavigate();

  const updateProduct = () => {
    fetch(`https://672883cb270bd0b97555dbc6.mockapi.io/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentProduct),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/list"); // useNavigate Hook
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          value={currentProduct.name}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, name: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control mb-2"
          value={currentProduct.price}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, price: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="form-control mb-2"
          value={currentProduct.category}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, category: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Stock"
          className="form-control mb-2"
          value={currentProduct.stock}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, stock: e.target.value })
          }
          required
        />
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
