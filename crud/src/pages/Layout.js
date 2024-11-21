import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div style={{ padding: "10px", backgroundColor: "blue" }}>
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            gap: "10px",
            margin: "0",
          }}
        >
          <li>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 20px",
                display: "inline-block",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/list"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 20px",
                display: "inline-block",
              }}
            >
              Show Products
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 20px",
                display: "inline-block",
              }}
            >
              Add Product
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
