import {Navigate, Outlet, useLocation} from "react-router-dom";
import AuthService from "@/services/auth/auth.js";

const PrivateRoute = () => {
    const auth = new AuthService();
    const location = useLocation();

    if (location.pathname.includes('/reset')) {
        return <Outlet />;
    }

    return auth.isLoggedIn() ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
