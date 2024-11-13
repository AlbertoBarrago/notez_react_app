import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Articles from "./routes/notes.jsx";
import About from "./routes/about";
import Contact from "./routes/contact";
import './index.css';
import {ContextProvider} from "@/context/index.jsx";
import AuthRoute from "@/routes/login.jsx";
import PrivateRoute from "@/utils/privateRoute.jsx";
import Auth from "@/services/auth/index.js";
import ErrorBoundary from "@/components/errors/error_boundary.jsx";

const publicPath = '/';
const auth = new Auth();

const routeConfig = [
    {
        path: publicPath,
        element: <ErrorBoundary><AuthRoute/></ErrorBoundary>,
        loader: () => auth.isLoggedIn() ? redirect('/note') : null,
    },
    {
        path: "/",
        element: <ErrorBoundary><PrivateRoute /></ErrorBoundary>,
        children: [
            { path: "note", element: <Articles /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
        ]
    },
    {
        path: "*",
        element: <ErrorBoundary><h1>404 - Page Not Found</h1></ErrorBoundary>,
    },
];

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider defaultTheme="system" storageKey="vite-ui-theme">
            <ErrorBoundary>
                <RouterProvider router={createBrowserRouter(routeConfig)}/>
            </ErrorBoundary>
        </ContextProvider>
    </React.StrictMode>
)
