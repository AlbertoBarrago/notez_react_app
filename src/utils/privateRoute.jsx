import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "@/services/auth/index.js";

const PrivateRoute = () => {
    const auth = new AuthService();

    return auth.isLoggedIn() ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
