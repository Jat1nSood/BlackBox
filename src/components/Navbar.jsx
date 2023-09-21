import React, { useState, useEffect } from "react";
import "../CSS/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut , getAuth} from "firebase/auth";
import { useUser } from './userContext'; 

export default function Navbar() {
  const auth = getAuth();
  const { user, userRole } = useUser(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="navLogo">
        Inventory.com
      </Link>
      <div>
        {user ? (
          <>
           
            <p>You are logged in as {userRole || "User"}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          ""
        )}
      </div>{" "}

    </div>
  );
}
