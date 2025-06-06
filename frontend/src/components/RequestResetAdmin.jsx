import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RequestResetAdmin() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRequestReset = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/request-reset`, { email });
      alert("Code de réinitialisation envoyé !");
      navigate(`/admin/verify-otp?email=${email}`); // ✅ Redirect to OTP verification page
    } catch (error) {
      alert("Erreur : Email introuvable.");
    }
  };

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fc",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div 
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
          animation: "fadeIn 0.5s ease-in-out"
        }}
      >
        <h2 
          style={{
            fontSize: "22px",
            color: "#333",
            marginBottom: "15px"
          }}
        >
          Réinitialisation du mot de passe - Admin
        </h2>

        <label 
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "5px",
            color: "#555"
          }}
        >
          Email :
        </label>

        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "16px",
            outline: "none",
            transition: "border-color 0.3s ease"
          }}
        />

<button 
  onClick={handleRequestReset}
  style={{
    background: "#ff5a00", /* ✅ Orange button */
    color: "#fff",
    padding: "12px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    width: "100%",
    marginTop: "15px"
  }}
>
  Envoyer le code
</button>

      </div>
    </div>
  );
}

export default RequestResetAdmin;
