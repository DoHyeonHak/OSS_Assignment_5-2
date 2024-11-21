import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ShowProducts = () => {
  // useState는 react에서 componenet 상태를 관리한다.
  const [products, setProducts] = useState([]); // Product list
  const [loading, setLoading] = useState(true); // 로딩 상태 관리 : API에서 데이터가 로딩 중일 때
  //   const [showAddModal, setShowAddModal] = useState(false); // false로 한 이유는 시작부터 modal이 열리진 않기 때문
  //   const [showUpdateModal, setShowUpdateModal] = useState(false); // 위와 동일

  useEffect(() => {
    fetchProducts();
  }, []);

  // API를 통해 모든 데이터를 불러온다.
  const fetchProducts = () => {
    fetch("https://672883cb270bd0b97555dbc6.mockapi.io/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <div
      className="container"
      style={{
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "50px",
        }}
      >
        Products Management CRUD
      </h2>
      <button className="btn btn-primary me-2" onClick={fetchProducts}>
        Bring all products data
      </button>
      <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
        Add Product
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          id="contents"
          style={{
            backgroundColor: "#ffffff",
            padding: "10px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          <div
            className="row mb-2 font-weight-bold text-black"
            style={{
              padding: "4px",
              fontSize: "20px",
            }}
          >
            <div className="col">Name</div>
            <div className="col">Price</div>
            <div className="col">Stock</div>
            <div className="col">Category</div>
            <div className="col">Actions</div>
          </div>
          {products.map((product) => (
            <div className="row mb-2" key={product.id}>
              <div className="col">{product.name}</div>
              <div className="col">${product.price}</div>
              <div className="col">{product.stock}</div>
              <div className="col">{product.category}</div>
              <div className="col">
                <button
                  className="btn btn-info btn-sm text-white"
                  onClick={() => {
                    setCurrentProduct(product);
                    setShowUpdateModal(true);
                  }}
                >
                  Modify
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product.id, fetchProducts)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
