import React from "react";
import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  Navbar,
  Home,
  TodoListApp,
  Signup,
  Signin,
  Account,
  ForgotPassword,
} from "./components/index";

/** Protects child route from users that aren't signed in, redirecting them to the sign in page.  */
export const PrivateRoute = (redir: { redir: string }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to={"/" + redir} />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todolist" element={<TodoListApp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* Protected Route  */}
          <Route path="/account" element={<PrivateRoute redir="signin" />}>
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
