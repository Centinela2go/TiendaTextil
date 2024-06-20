import React from "react";
import { useAuth } from "../Providers";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = useAuth();
  if (!user.token) {
    return <Navigate to={"/login"} />;
  } else {
    return <Outlet />;
  }
}
