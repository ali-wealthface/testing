import React from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state: IAppState) => state.auth);

  if (!isLoggedIn)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
};

export default ProtectedRoutes;
