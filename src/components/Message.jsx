import React from "react";

function Message({ message, user }) {
  const isUser = message.uid === user.uid;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        justifyContent: isUser ? "flex-end" : "flex-start",
        margin: "12px 0",
      }}
    >
      <img
        src={message.photoURL}
        alt="user"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          margin: isUser ? "0 0 0 10px" : "0 10px 0 0",
          border: "2px solid #ddd",
        }}
      />
      <div
        style={{
          backgroundColor: isUser ? "#ffe0b2" : "#c8e6c9", // orange for user, green for others
          color: "#333",
          padding: "12px 16px",
          borderRadius: "20px",
          maxWidth: "70%",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            fontSize: "0.85rem",
            fontWeight: "bold",
            color: isUser ? "#e65100" : "#2e7d32",
            marginBottom: "4px",
          }}
        >
          {message.displayName}
        </div>
        <div style={{ fontSize: "1rem" }}>{message.text}</div>
      </div>
    </div>
  );
}

export default Message;
