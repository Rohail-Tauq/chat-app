import React, { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function Message({ message, user }) {
  const isOwnMessage = user.uid === message.uid;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "messages", message.id));
  };

  const handleEdit = async () => {
    if (!editText.trim()) return;
    await updateDoc(doc(db, "messages", message.id), {
      text: editText,
      edited: true,
    });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isOwnMessage ? "row-reverse" : "row",
        alignItems: "flex-start",
        marginBottom: "18px",
        padding: "0 10px",
      }}
    >
      {/* Profile Picture */}
      <img
        src={message.photoURL}
        alt="User"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          margin: isOwnMessage ? "0 0 0 12px" : "0 12px 0 0",
          border: "2px solid #ddd",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        }}
      />

      {/* Message Bubble */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          padding: "14px 18px",
          borderRadius: "16px",
          maxWidth: "75%",
          width: "fit-content",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          textAlign: "left",
          color: "#000",
        }}
      >
        {/* Name */}
        <div
          style={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            color: "#222",
            marginBottom: "6px",
          }}
        >
          {message.displayName} {message.edited && <em style={{ fontWeight: "normal" }}>(edited)</em>}
        </div>

        {/* Message Content */}
        {isEditing ? (
          <>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                color: "#000",
              }}
            />
            <div>
              <button
                onClick={handleEdit}
                style={buttonStyle("#4caf50")}
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={buttonStyle("#9e9e9e")}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "1rem", lineHeight: "1.5", color: "#000" }}>
              {message.text}
            </div>
            {isOwnMessage && (
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setIsEditing(true)}
                  style={buttonStyle("#ff9800")}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  style={buttonStyle("#f44336")}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Shared button styling function
const buttonStyle = (bgColor) => ({
  background: bgColor,
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "background 0.3s",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

export default Message;
