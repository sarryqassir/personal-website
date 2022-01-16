import React, { useRef, useState } from "react";
import "./Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  /** https://stackoverflow.com/a/70531954 */
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !passwordConfirmRef.current
    )
      return;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/signin");
    } catch {
      setError("Failed to create account.");
    }
    setLoading(false);
  }

  return (
    <div className="signup-container">
      <div className="signup-container-div">
        <div className="signup-body-container">
          <div className="signup-body">
            <h2 className="signup-header">Sign up</h2>
            {error && (
              <div role="alert" className="signup-error-alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="signup-form-group" id="email">
                <label className="signup-label">Email</label>
                <input
                  className="signup-input"
                  type="email"
                  ref={emailRef}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="signup-form-group" id="password">
                <label className="signup-label">Password</label>
                <input
                  className="signup-input"
                  type="password"
                  ref={passwordRef}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="signup-form-group" id="password-confirm">
                <label className="signup-label">Password Confirmation</label>
                <input
                  className="signup-input"
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button
                disabled={loading}
                className="signup-button"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="signup-login-redirect">
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
