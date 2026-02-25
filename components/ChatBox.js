"use client";
import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "ai", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "ai", content: "Error: Try again" }]);
    }

    setLoading(false);
  };

  return (
    <div style={{ width: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          height: "400px",
          overflowY: "auto",
          marginBottom: "0.5rem",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "15px",
                backgroundColor: msg.role === "user" ? "#4a90e2" : "#e2e2e2",
                color: msg.role === "user" ? "white" : "black",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p>AI is typing...</p>}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "0.5rem", borderRadius: "8px 0 0 8px", border: "1px solid #ccc" }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            backgroundColor: "#4a90e2",
            color: "white",
            borderRadius: "0 8px 8px 0",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}