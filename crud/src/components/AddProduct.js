import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProduct = ({ fetchProducts }) => {
  // useState는 react에서 componenet 상태를 관리한다.
  const [products, setProducts] = useState([]); // Product list
  const [loading, setLoading] = useState(true); // 로딩 상태 관리 : API에서 데이터가 로딩 중일 때
  //   const [showAddModal, setShowAddModal] = useState(false); // false로 한 이유는 시작부터 modal이 열리진 않기 때문
  //   const [showUpdateModal, setShowUpdateModal] = useState(false); // 위와 동일
  const [newProduct, setNewProduct] = useState({
    // product 추가 위해
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Product 추가 기능
  const addProduct = () => {
    fetch("https://672883cb270bd0b97555dbc6.mockapi.io/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (response.ok) {
          setNewProduct({ name: "", price: "", category: "", stock: "" });
          fetchProducts();
        }
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div>
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
