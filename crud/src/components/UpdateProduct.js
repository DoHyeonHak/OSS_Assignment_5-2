import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateProduct = ({ fetchProducts }) => {
  // useState는 react에서 componenet 상태를 관리한다.
  const [products, setProducts] = useState([]); // Product list
  const [loading, setLoading] = useState(true); // 로딩 상태 관리 : API에서 데이터가 로딩 중일 때
  const [currentProduct, setCurrentProduct] = useState({
    // product 수정 위해
    id: "",
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Product 수정 기능
  const updateProduct = () => {
    fetch(
      `https://672883cb270bd0b97555dbc6.mockapi.io/products/${currentProduct.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProduct),
      }
    )
      .then((response) => {
        if (response.ok) {
          setShowUpdateModal(false);
          fetchProducts();
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div>
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
