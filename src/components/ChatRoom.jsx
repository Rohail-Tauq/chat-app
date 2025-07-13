import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Message from "./Message";

function ChatRoom({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      createdAt: serverTimestamp(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });

    setMessage("");
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} style={styles.inputForm}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.messageInput}
        />
        <button
          type="submit"
          style={{
            ...styles.sendButton,
            backgroundColor: message.trim() ? "#4285F4" : "#cccccc",
            cursor: message.trim() ? "pointer" : "not-allowed"
          }}
          disabled={!message.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "70vh",
    maxWidth: "800px",
    margin: "0 auto",
    border: "1px solid #e1e1e1",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  messagesContainer: {
    flex: 1,
    padding: "1rem",
    overflowY: "auto",
    backgroundColor: "#f9f9f9"
  },
  inputForm: {
    display: "flex",
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
    backgroundColor: "#fff"
  },
  messageInput: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid #e1e1e1",
    borderRadius: "24px",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.3s"
  },
  sendButton: {
    marginLeft: "12px",
    padding: "0 16px",
    border: "none",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s"
  }
};

export default ChatRoom;
