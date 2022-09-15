import { useState, useEffect, createContext, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config/api";
import { toast } from "react-toastify";
import {
  getAuthenticated,
  saveAuthenticated,
  removeAuthenticated,
} from "././localstorage/auth";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(getAuthenticated);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    saveAuthenticated(user);
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      setErrors(null);
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const user = response.data.token;

        setUser(user);

        saveAuthenticated(user);

        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      // error cases

      if (error.response.status === 401) {
        setErrors(error.response.data.message);
        toast.error(error.response.data.message);
      } else if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        toast.error(errors);
      }
    }
  };

  const logout = () => {
    setUser(null);
    removeAuthenticated();

    navigate("/login");
  };

  const auth = { user, errors, login, logout };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}

function AuthRoute(props) {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return props.children;
}

export { AuthProvider, AuthRoute, useAuth };
