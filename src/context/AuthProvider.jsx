import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/auth";
import { LoginService, LogoutService, SignUpService } from "../services/auth.service";
import { AuthContext } from "./AuthContext";
import { validateCredentials } from "../utils/validateCredential";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user ? { uid: user.uid, email: user.email } : null);
      setLoading(false);
    });

    return unsub;
  }, []);

  const login = async (email, password) => {
    const validated = validateCredentials(email, password);
    await LoginService(validated.email, validated.password);
  };

  const signup = async (email, password) => {
    const validated = validateCredentials(email, password);
    await SignUpService(validated.email, validated.password);
  };

  const logout = async () => {
    await LogoutService();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
