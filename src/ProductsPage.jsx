
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./App.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.ecommerce.qafdev.com/products")
      .then((response) => {
        setProducts(response.data.data.data);
      })
      .catch((error) => {
        console.error("خطأ في جلب المنتجات:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}
