import { data } from "autoprefixer";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");

  const navigate = useNavigate();

  const loginAction = (data) => {
       console.log(data);
      axios.post("http://127.0.0.1:8000/login/", data, {
        'Content-Type': 'application/json',
      }).then((res) => {
        if (res.data) {
          console.log("llega")
          setUser(res.data.user);
          setToken(res.data.token);
          localStorage.setItem("site", res.data.token);
          navigate("/dashboard");
          return;
        }
      })

      
     
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
