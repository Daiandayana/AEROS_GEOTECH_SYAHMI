"use client";
import ChatBox from "@/components/ChatBox";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const profilePageUrl = "/pages/change-password"; 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Dashboard</h1>

      {/* Profile Button */}
      <button
        onClick={() => router.push(profilePageUrl)}
        style={{
          padding: "0.5rem 1rem",
          marginBottom: "2rem",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#4a90e2",
          color: "white",
          cursor: "pointer",
        }}
      >
        Go to Profile
      </button>

      {/* ChatBox */}
      <ChatBox />
    </div>
  );
}