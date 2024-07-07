import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function LanAccountding() {
  const {
    auth: { username, email },
    setAuth,
  } = useAuth();

  const handleSignOut = (e) => {
    e.preventDefault();
    setAuth({});
  };

  return (
    <section className="flex-container">
      <div className="container">
        <h1>My Account Details</h1>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <div>
          <button className="landing-button" onClick={handleSignOut}>
            LOG OUT
          </button>
        </div>
      </div>
    </section>
  );
}
