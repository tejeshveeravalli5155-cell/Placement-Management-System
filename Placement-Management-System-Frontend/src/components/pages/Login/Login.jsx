import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { isLoggedIn, login as saveSession } from "../../../utils/auth";
import { useToast } from "../../Toast/ToastContext";
import api from "../../../api/api";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already logged in, skip straight to the dashboard
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      saveSession(token, user);
      toast.success(`Welcome back, ${user?.name || "Admin"}!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <h1>Placement Management Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="secondary-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="register-text">
        Registering a student instead?
        <Link to="/register"> Go to Student Registration</Link>
      </p>
    </div>
  );
}

export default Login;
