import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useAuth } from "../contexts/AuthContext";

function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!emailRef.current?.value) return;

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email to continue with your password reset");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div className="signup-container">
      <div className="signup-container-div">
        <div className="signup-body-container">
          <div className="signup-body">
            <h2 className="signup-header">Reset Password</h2>
            {error && (
              <div role="alert" className="signup-error-alert">
                {error}
              </div>
            )}
            {message && (
              <div role="alert" className="signup-success-alert">
                {message}
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
              <button
                disabled={loading}
                className="signup-button"
                type="submit"
              >
                Reset Password
              </button>
            </form>
            <div className="forgot-password-redirect">
              {/* probably replace this with a back button */}
              <Link to="/signin">Cancel</Link>
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

export default ForgotPassword;
