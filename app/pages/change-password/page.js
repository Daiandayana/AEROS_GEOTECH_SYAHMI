"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [sessionUser, setSessionUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("sessionUser");
    if (user) {
      setSessionUser(user);
      setUsername(user);
      console.log("Session User:", user);
    } else {
      console.log("No session user found");
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.message === "Password updated successfully") {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
          width: "350px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#333",
          }}
        >
          Profile
        </h2>

        {/* Dashboard Button */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={() => router.push("/pages/dashboard")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#4a90e2",
              color: "white",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
        </div>

        <form onSubmit={handleChangePassword}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              readOnly
              style={{
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.3rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "#f5f5f5",
                cursor: "not-allowed",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.3rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#4a90e2",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Update Password
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color:
                message === "Password updated successfully" ? "green" : "red",
              fontSize: "0.9rem",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
