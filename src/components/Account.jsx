import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function LanAccountding() {
  const {
    auth: { user_id },
    setAuth,
  } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUserDetails = async (user_id) => {
      const response = await axios.get(`users/${user_id}`);
      setUsername(response.data.user.username);
      setEmail(response.data.user.email);
    };

    getUserDetails(user_id)
  }, []);

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
