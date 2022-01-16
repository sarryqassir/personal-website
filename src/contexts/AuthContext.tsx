import React, { useContext, useState, useEffect } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

/** Items accessible in the auth context */
interface authItems {
  currentUser: User | null;
  signup: (email: string, password: string) => void;
  signin: (email: string, password: string) => void;
  signout: () => void;
}

/** Holds context, initialized with the createContext hook with properties set to null */
const AuthContext = React.createContext<authItems>({
  currentUser: null,
  signup: (email, password) => {},
  signin: (email, password) => {},
  signout: () => {},
});

/** Returns auth context */
export function useAuth(): authItems {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: authItems = { currentUser, signup, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// export default AuthContext;
