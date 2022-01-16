import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useAuth } from "../contexts/AuthContext";

function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signin } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  /** https://stackoverflow.com/a/70531954 */
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!emailRef.current?.value || !passwordRef.current?.value) return;

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      navigate("/account");
    } catch {
      setError("Failed to sign in.");
    }
    setLoading(false);
  }

  return (
    <div className="signup-container">
      <div className="signup-container-div">
        <div className="signup-body-container">
          <div className="signup-body">
            <h2 className="signup-header">Sign In</h2>
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
              <button
                disabled={loading}
                className="signup-button"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <div className="forgot-password-redirect">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
        </div>
        <div className="signup-login-redirect">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
