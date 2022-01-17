import React, { useState } from "react";
import "./Account.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Account() {
  const [error, setError] = useState<string>("");
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();

  async function handleSignout() {
    setError("");

    try {
      await signout();
      navigate("/signin");
    } catch {
      setError("Failed to Sign Out");
    }
  }

  function handleDelete() {
    console.log("delete account (soon)");
  }

  return (
    <div className="account-container">
      <div className="account-container-div">
        <div className="account-body-container">
          <div className="account-body">
            <h2 className="account-header">Account</h2>
            {error && (
              <div role="alert" className="account-error-alert">
                {error}
              </div>
            )}
            <strong>Email:</strong> {currentUser && currentUser.email}
            <Link to="/update-account" className="btn btn-primary w-100 mt-3">
              Update Account
            </Link>
          </div>
        </div>
        <div className="account-button-div">
          <button className="btn-link" onClick={handleSignout}>
            Sign Out
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
