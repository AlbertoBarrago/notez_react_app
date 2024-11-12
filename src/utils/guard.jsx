import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "@/services/auth/index.js";

const PrivateRoute = () => {
    const auth = new Auth();

    return auth.isLoggedIn() ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
