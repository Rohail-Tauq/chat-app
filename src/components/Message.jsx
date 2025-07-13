// components/Message.jsx
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
        marginBottom: "14px",
      }}
    >
      {/* Profile Picture */}
      <img
        src={message.photoURL}
        alt="User"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          margin: isOwnMessage ? "0 0 0 10px" : "0 10px 0 0",
          border: "2px solid #ccc",
        }}
      />

      {/* Message Bubble */}
      <div
        style={{
          backgroundColor: isOwnMessage ? "#e0f7fa" : "#f1f1f1",
          padding: "10px 14px",
          borderRadius: "12px",
          maxWidth: "70%",
          width: "fit-content",
          textAlign: "left",
          color: "#000", // ✅ Force black text
        }}
      >
        <div
          style={{
            fontSize: "0.85rem",
            fontWeight: "bold",
            color: "#222", // ✅ Darker text for name
            marginBottom: "4px",
          }}
        >
          {message.displayName} {message.edited && <em>(edited)</em>}
        </div>

        {isEditing ? (
          <>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                fontSize: "1rem",
                marginBottom: "6px",
                color: "#000", // ✅ Ensure input text is visible
              }}
            />
            <div>
              <button
                onClick={handleEdit}
                style={{
                  marginRight: "8px",
                  background: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  background: "#bdbdbd",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "1rem", color: "#000" /* ✅ Message text color */ }}>
              {message.text}
            </div>
            {isOwnMessage && (
              <div style={{ marginTop: "6px" }}>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    marginRight: "8px",
                    background: "#ff9800",
                    color: "#fff",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    background: "#f44336",
                    color: "#fff",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
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

export default Message;
