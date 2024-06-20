import { data } from "autoprefixer";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");

  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      //   const response = await fetch("your api", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });

      //   const res = await response.json();

      const res = {
        data: {
          user: "orlando",
        },
        token: "orlando",
      };

      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.log(err);
    }
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
