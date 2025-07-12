import React, { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import ChatRoom from "./components/ChatRoom";
import { auth, provider, db } from "./firebase";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.contentBox}>
        <h1 style={styles.title}>🔥 React Firebase Chat</h1>
        {user ? (
          <>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
            <ChatRoom user={user} />
          </>
        ) : (
          <button style={styles.loginButton} onClick={handleLogin}>
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",  
    width: "100vw",
    margin: 0,   
    padding: 0, 
    backgroundColor: "#f5f5f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  contentBox: {
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "2rem",
    textAlign: "center"
  },
  title: {
    color: "#333",
    marginBottom: "2rem",
    fontSize: "2rem"
  },
  loginButton: {
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    ":hover": {
      backgroundColor: "#3367D6"
    }
  },
  logoutButton: {
    backgroundColor: "#EA4335",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "1.5rem",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#D33426"
    }
  }
};

export default App;