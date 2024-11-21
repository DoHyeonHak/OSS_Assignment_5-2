import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="container text-center"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // 화면 중앙 정렬
      }}
    >
      <h1>Welcome to my Product Management Homepage</h1>
      <div style={{ marginTop: "20px" }}>
        <Link
          to="/list"
          className="btn btn-primary"
          style={{
            margin: "10px",
            width: "160px",
          }}
        >
          Go to Product List
        </Link>
        <Link
          to="/add"
          className="btn btn-primary"
          style={{
            margin: "10px",
            width: "160px",
          }}
        >
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default Home;
