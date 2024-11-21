const DeleteProduct = (id, fetchProducts) => {
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

export default DeleteProduct;
