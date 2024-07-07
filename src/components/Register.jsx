import { useState, useEffect } from "react";
import axios from "../api/axios";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = "/users/register";

export default function Register() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState("");
  const [validPasswordMatch, setValidPasswordMatch] = useState(false);
  const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
    const match = password === passwordMatch;
    setValidPasswordMatch(match);
  }, [password, passwordMatch]);

  useEffect(() => {
    setErrorMsg('')
  }, [username, email, password, passwordMatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        { username, email, password }
      );
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordMatch("");
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMsg("Email already registered");
      } else {
        setErrorMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>Sign In</p>
        </section>
      ) : (
        <section>
          <p>{errorMsg}</p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />

            {emailFocus && !validEmail ? (
              <p>Please enter a valid email address</p>
            ) : (
              <></>
            )}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />

            {passwordFocus && !validPassword ? (
              <p>
                8 to 24 characters.
                <br />
                Must include at least one uppercase and lowercase letter, a
                number and a special character.
                <br />
              </p>
            ) : (
              <></>
            )}

            <label htmlFor="confirm_password">Confirm Password:</label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => setPasswordMatch(e.target.value)}
              value={passwordMatch}
              required
              onFocus={() => setPasswordMatchFocus(true)}
              onBlur={() => setPasswordMatchFocus(false)}
            />

            {passwordMatchFocus && !validPasswordMatch ? (
              <p>Must match password input field</p>
            ) : (
              <></>
            )}

            <button
              disabled={
                !username ||
                !validEmail ||
                !validPassword ||
                !validPasswordMatch
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span>
              {/*put router link here*/}
              Sign In
            </span>
          </p>
        </section>
      )}
    </>
  );
}
