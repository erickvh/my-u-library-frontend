import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config/api";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [errors, setErrors] = React.useState(null);

  const login = async ({ email, password }) => {
    try {
      setErrors(null);
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        navigate("/");
      }
    } catch (error) {
      console.log("inside login", error.response.data);
      if (error.response.status === 401) {
        setErrors(error.response.data);
      } else if (error.response.status === 422) {
        setErrors(error.response.data);
      }
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const auth = { user, errors, login, logout };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const auth = React.useContext(AuthContext);

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
