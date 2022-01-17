import React, { useRef, useState } from "react";
import "./Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function UpdateAccount() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value)
      return setError("Passwords do not match");

    if (
      !passwordRef.current?.value &&
      emailRef.current?.value === currentUser?.email
    )
      return setError("Email and password have not changed");

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current && emailRef.current.value !== currentUser?.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current?.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => !error && navigate("/account"))
      .catch(() => setError("Failed to update account"))
      .finally(() => setLoading(false));
  }

  return (
    <div className="signup-container">
      <div className="signup-container-div">
        <div className="signup-body-container">
          <div className="signup-body">
            <h2 className="signup-header">Update Profile</h2>
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
                  defaultValue={String(currentUser?.email)}
                />
              </div>
              <div className="signup-form-group" id="password">
                <label className="signup-label">Password</label>
                <input
                  className="signup-input"
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div className="signup-form-group" id="password-confirm">
                <label className="signup-label">Password Confirmation</label>
                <input
                  className="signup-input"
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <button
                disabled={loading}
                className="signup-button"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="signup-login-redirect">
          <Link to="/account">Cancel</Link>
        </div>
      </div>
    </div>
  );
}

export default UpdateAccount;
