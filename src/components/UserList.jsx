import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function UserList({ currentUser, onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const allUsers = snapshot.docs
        .map((doc) => doc.data())
        .filter((u) => u.uid !== currentUser.uid); // exclude self
      setUsers(allUsers);
    });

    return () => unsubscribe();
  }, [currentUser.uid]);

  return (
    <div style={styles.listContainer}>
      <h2 style={styles.heading}>Start a Chat</h2>
      {users.map((user) => (
        <div
          key={user.uid}
          onClick={() => onSelectUser(user)}
          style={styles.userItem}
        >
          <img src={user.photoURL} alt={user.displayName} style={styles.avatar} />
          <span>{user.displayName}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  listContainer: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fff",
    maxHeight: "200px",
    overflowY: "auto",
  },
  heading: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    textAlign: "center",
    color: "#333"
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    marginBottom: "6px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.2s",
    backgroundColor: "#f7f7f7",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    marginRight: "10px",
  }
};

export default UserList;
