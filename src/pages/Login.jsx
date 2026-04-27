import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true);

    try {
      await login(email, password);
      navigate("/"); // Redirect to home on success
    } catch (err) {
      // Provide specific feedback based on Firebase error codes
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Failed to sign in. Please check your connection.");
      }
      
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: "100px 20px", 
      maxWidth: "400px", 
      margin: "0 auto", 
      textAlign: "center" 
    }}>
      <h1 style={{ marginBottom: "20px", color: "#3e2723" }}>Welcome Back</h1>
      
      {error && (
        <div style={{ 
          color: "white", 
          backgroundColor: "#d32f2f", 
          padding: "10px", 
          borderRadius: "5px", 
          marginBottom: "20px" 
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          required
          style={{ padding: "12px", borderRadius: "4px", border: "1px solid #ccc" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          style={{ padding: "12px", borderRadius: "4px", border: "1px solid #ccc" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: "12px", 
            backgroundColor: "#3e2723", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Don't have an account? <Link to="/register" style={{ color: "#3e2723", fontWeight: "bold" }}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;