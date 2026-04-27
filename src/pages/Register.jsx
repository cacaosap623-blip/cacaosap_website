import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      // Friendly error messages based on Firebase error codes
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Failed to create an account. Please try again.");
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
      <h1 style={{ marginBottom: "20px", color: "#3e2723" }}>Join CACAOSAP</h1>
      
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
          required
          style={{ padding: "12px", borderRadius: "4px", border: "1px solid #ccc" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
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
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Already have an account? <Link to="/login" style={{ color: "#3e2723", fontWeight: "bold" }}>Login here</Link>
      </p>
    </div>
  );
};

export default Register;