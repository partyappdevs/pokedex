import React, { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "../context/loginContext";

interface IProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const location = useLocation();
  const state = useAuthState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (!state.token) {
    return <Navigate to="/login" replace />;
  }
  if (state) {
    return <>{children}</>;
  }
  return null;
}
