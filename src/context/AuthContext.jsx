import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import api from "../api/axios";

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    loading: true,
  });

  // Prevent double-runs under StrictMode
  const didAttempt = useRef(false);

  // fetch “who am I?” exactly once
  const checkAuth = useCallback(async () => {
    try {
      const res = await api.get("/users/me");
      setState({ user: res.data.data, loading: false });
    } catch (error) {
      // only clear user on real 401
      if (error.response?.status === 401) {
        setState({ user: null, loading: false });
      } else {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
  }, []);

  useEffect(() => {
    if (didAttempt.current) return;
    didAttempt.current = true;
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/users/login", { email, password });
      setState({ user: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } finally {
      setState({ user: null, loading: false });
    }
  };

  if (state.loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
