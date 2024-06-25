import { data } from "autoprefixer";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [token, setToken] = useState(localStorage.getItem("site") || "");

  const navigate = useNavigate();

  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  }

  const loginAction = (data) => {
      
      axios.post("http://127.0.0.1:8000/login/", data, {
        'Content-Type': 'application/json',
      }).then((res) => {
        if (res.data) {
        
          setUser(
            {
              "username": res.data.user.username,
              "name": res.data.user.name,
              "last_name": res.data.user.last_name,
              "email": res.data.user.email,
            }
          );
          console.log(res.data);
          setToken(res.data.token);
          localStorage.setItem("site", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/dashboard");
          return;
        }
      })

      
     
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
