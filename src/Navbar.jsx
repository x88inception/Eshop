
import { Link } from "react-router-dom";
import "./App.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/products">Products</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/">Logout</Link>
    </nav>
  );
}
