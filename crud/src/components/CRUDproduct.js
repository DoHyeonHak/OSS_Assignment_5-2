import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CRUDproduct = () => {
  // useState는 react에서 componenet 상태를 관리한다.
  const [products, setProducts] = useState([]); // Product list
  const [loading, setLoading] = useState(true); // 로딩 상태 관리 : API에서 데이터가 로딩 중일 때
  const [showAddModal, setShowAddModal] = useState(false); // false로 한 이유는 시작부터 modal이 열리진 않기 때문
  const [showUpdateModal, setShowUpdateModal] = useState(false); // 위와 동일
  const [newProduct, setNewProduct] = useState({
    // product 추가 위해
    name: "",
    price: "",
    category: "",
    stock: "",
  });
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
          setShowAddModal(false);
          fetchProducts();
        }
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

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

  // Product 삭제 기능
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`https://672883cb270bd0b97555dbc6.mockapi.io/products/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) fetchProducts();
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
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
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={addProduct}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Product</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Price"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Category"
                  value={currentProduct.category}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      category: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Stock"
                  value={currentProduct.stock}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      stock: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={updateProduct}>
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDproduct;
