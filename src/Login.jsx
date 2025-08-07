
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./app.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("https://api.ecommerce.qafdev.com/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.data.access_token;
        const role = response.data.data.user.role;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "SUPER_ADMIN" || role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/products");
        }
      })
      .catch((error) => {
        console.error("فشل تسجيل الدخول:", error);
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
