import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import {
  faCheck,
  faTimes,
  faCircleInfo,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = "/users/register";

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
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
    setErrorMsg("");
  }, [username, email, password, passwordMatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setLoadingMsg('Signing you in, please wait')
    try {
      const response = await axios.post(REGISTER_URL, {
        username,
        email,
        password,
      });
      setSuccess(true);
      setLoading(false)
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordMatch("");
    } catch (err) {
      setLoading(false)
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
        <section className="flex-container">
          <div className="container">
            <h1>Success!</h1>
            <Link to={"/login"}>Sign In</Link>
          </div>
        </section>
      ) : (
        <section className="flex-container">
          <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:&nbsp;
                {username ? (
                  <span>
                    <FontAwesomeIcon icon={faCheck} className="check" />
                  </span>
                ) : (
                  <></>
                )}
              </label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />

              <label htmlFor="email">
                Email:&nbsp;
                {validEmail ? (
                  <span>
                    <FontAwesomeIcon icon={faCheck} className="check" />
                  </span>
                ) : (
                  <></>
                )}
                {!validEmail && email ? (
                  <span>
                    <FontAwesomeIcon icon={faTimes} className="cross" />
                  </span>
                ) : (
                  <></>
                )}
              </label>
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
                <p className="info-message"><FontAwesomeIcon icon={faCircleInfo}/> Please enter a valid email address</p>
              ) : (
                <></>
              )}

              <label htmlFor="password">
                Password:&nbsp;
                {validPassword ? (
                  <span>
                    <FontAwesomeIcon icon={faCheck} className="check" />
                  </span>
                ) : (
                  <></>
                )}
                {!validPassword && password ? (
                  <span>
                    <FontAwesomeIcon icon={faTimes} className="cross" />
                  </span>
                ) : (
                  <></>
                )}
              </label>
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
                <p className="info-message"><FontAwesomeIcon icon={faCircleInfo}/> 8 to 24 characters.
                  <br />
                  Must include at least one uppercase and lowercase letter, a
                  number and a special character.
                  <br />
                </p>
              ) : (
                <></>
              )}

              <label htmlFor="confirm_password">
                Confirm Password:&nbsp;
                {validPasswordMatch && passwordMatch ? (
                  <span>
                    <FontAwesomeIcon icon={faCheck} className="check" />
                  </span>
                ) : (
                  <></>
                )}
                {!validPasswordMatch && passwordMatch ? (
                  <span>
                    <FontAwesomeIcon icon={faTimes} className="cross" />
                  </span>
                ) : (
                  <></>
                )}
              </label>
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
                <p className="info-message"><FontAwesomeIcon icon={faCircleInfo}/> Must match password input field</p>
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
            {loading ? ( 
          <span><p>{loadingMsg}</p><FontAwesomeIcon icon={faSpinner} spin /></span> )
        : (<></>) }
              <p className="error-message">{errorMsg}</p>
            <p>
              Already registered?
              <br />
              <Link to={"/login"} className="link">Sign In</Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
