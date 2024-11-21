import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// reference : https://velog.io/@imzzuu/React-Input-control-과-useRef의-적절한-사용-Input-유효성-검사

const AddProduct = ({ fetchProducts }) => {
  const [newProduct, setNewProduct] = useState({
    // product 추가 위해
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const navigate = useNavigate(); // hook : 페이지 전환에 용이. onclick, window.href로도 할 수 있긴 하나, 이것도 훅이니 사용

  // Product 추가 기능
  const addProduct = () => {
    fetch("https://672883cb270bd0b97555dbc6.mockapi.io/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product added successfully");
          setNewProduct({ name: "", price: "", category: "", stock: "" });
          navigate("/list"); // useNavigate Hook
        }
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control mb-2"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="form-control mb-2"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Stock"
          className="form-control mb-2"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
          required
        />
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
