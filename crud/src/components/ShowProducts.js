import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteProduct from "./DeleteProduct";
import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
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
    <div className="container" style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "50px" }}>Products Management CRUD</h2>
      <button className="btn btn-primary me-2" onClick={fetchProducts}>
        Bring all products data
      </button>

      <Link to="/add" className="btn btn-primary">
        Add Product
      </Link>

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
                <Link
                  to={`/datail/${product.id}`}
                  className="btn btn-info btn-sm text-white"
                >
                  Detail
                </Link>
                <Link
                  to={`/update/${product.id}`}
                  className="btn btn-info btn-sm text-white"
                >
                  Modify
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => DeleteProduct(product.id, fetchProducts)}
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
