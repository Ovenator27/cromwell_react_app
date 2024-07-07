import { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/users/login";

export default function Login() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setLoadingMsg('Signing you in, please wait')

    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      const accessToken = response?.data?.accessToken;
      const username = response?.data?.user?.username;
      setAuth({ email, password, accessToken, username });
      setEmail("");
      setPassword("");
      setLoading(false)
      navigate(from);
    } catch (err) {
      setLoading(false)
      if (!err?.response) {
        setErrorMessage("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMessage("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrorMessage("Incorrect Email or Password");
      } else {
        setErrorMessage("Login Failed");
      }
    }
  };

  return (
    <section className="flex-container">
      <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>LOGIN</button>
      </form>
        {loading ? ( 
          <span><p>{loadingMsg}</p><FontAwesomeIcon icon={faSpinner} spin /></span> )
        : (<></>) }
        <p className="error-message">{errorMessage}</p>
      <p>
        Need an Account? <Link to={'/register'} className="link">Sign Up</Link>
      </p>
      </div>
    </section>
  );
}
