import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Articles from "./routes/notes.jsx";
import Explore from "./routes/explore.jsx";
import './style.css';
import {ContextProvider} from "@/context/theme.jsx";
import AuthRoute from "@/routes/login.jsx";
import PrivateRoute from "@/routes/privateRoute.jsx";
import AuthService from "@/services/login/login.js";
import ResetPassword from "@/routes/resetPassword.jsx";

const publicPath = '/';
const auth = new AuthService();

const routeConfig = [
    {
        path: publicPath,
        element: <AuthRoute/>,
        loader: () => auth.isLoggedIn() ? redirect('/note') : null,
    },
    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            { path: "note", element: <Articles /> },
            { path: "explore", element: <Explore /> },
            { path: "reset/password/:token", element: <ResetPassword /> },
        ]
    },
    {
        path: "*",
        element: <h1>404 - Page Not Found</h1>,
    },
];

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RouterProvider router={createBrowserRouter(routeConfig)}/>
        </ContextProvider>
    </React.StrictMode>
)
