import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./app.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://api.ecommerce.qafdev.com/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { name, description, price } = res.data.data;
        setProduct({ name, description, price });
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(
        `https://api.ecommerce.qafdev.com/products/${id}`,
        {
          name: product.name,
          description: product.description,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("تم تحديث المنتج");
        navigate("/admin");
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        alert("فشل التحديث");
      });
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Edit Product</h2>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </>
  );
}
