import React, { useState, useRef } from "react";
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

  const navigate = useNavigate(); // /list로 넘기기 위해 사용한 훅

  const nameCheck = useRef(null);
  const priceCheck = useRef(null);
  const categoryCheck = useRef(null);
  const stockCheck = useRef(null);

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

  const checkValid = () => {
    let bool = true;

    if (currentProduct.name === "") {
      alert("Input name");
      nameCheck.current.focus();
      bool = false;
    } else if (!currentProduct.price) {
      alert("Input price");
      priceCheck.current.focus();
      bool = false;
    } else if (currentProduct.category === "") {
      alert("Input category");
      categoryCheck.current.focus();
      bool = false;
    } else if (!currentProduct.stock) {
      alert("Input stock");
      stockCheck.current.focus();
      bool = false;
    }
    return bool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValid()) {
      updateProduct();
    }
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          ref={nameCheck}
          value={currentProduct.name}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control mb-2"
          ref={priceCheck}
          value={currentProduct.price}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          className="form-control mb-2"
          ref={categoryCheck}
          value={currentProduct.category}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          className="form-control mb-2"
          ref={stockCheck}
          value={currentProduct.stock}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, stock: e.target.value })
          }
        />
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
