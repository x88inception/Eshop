
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://api.ecommerce.qafdev.com/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`https://api.ecommerce.qafdev.com/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete product:", error);
        alert("فشل حذف المنتج");
      });
  };
  const handleAddProduct = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("الرجاء تسجيل الدخول أولاً.");
      return;
    }

    axios
      .post(
        "https://api.ecommerce.qafdev.com/products",
        {
          name,
          description,
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("تمت إضافة المنتج بنجاح!");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
      })
      .catch((err) => {
        console.error("فشل الإضافة:", err.response?.data || err.message);
        alert(
          "فشل في إضافة المنتج: " +
            (err.response?.data?.message || "خطأ غير معروف")
        );
      });
  };

  return (
    <>
      <Navbar />
      <h1>Admin Panel</h1>
      <div className="add-product-form">
        <input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="الكمية"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleAddProduct}>إضافة المنتج</button>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}$</p>

            <Link to={`/edit/${product.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
