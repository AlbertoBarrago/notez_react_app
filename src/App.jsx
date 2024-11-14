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
import AuthService from "@/services/login/index.js";

const publicPath = '/';
const auth = new AuthService();
const routeConfig = [
    {
        path: publicPath,
        element: <AuthRoute/>,
        loader: () => {
            return auth.isLoggedIn() ? redirect('/note') : null;
        }
    },
    {
        path: "/note",
        element: <PrivateRoute />,
        children: [
            {
                path: "",
                element: <Articles />
            }
        ]
    },
    {
        path: publicPath + "/about",
        element: <PrivateRoute />,
        children: [
            {
                path: "",
                element: <About/>,
            }
        ]
    },
    {
        path: publicPath + "/contact",
        element: <PrivateRoute />,
        children: [
            {
                path:  "",
                element: <Contact/>,
            }
        ]
    },
    {
        path: "*",
        element: <h1>404 - Page Not Found</h1>,
    },
]

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RouterProvider router={createBrowserRouter(routeConfig)}/>
        </ContextProvider>
    </React.StrictMode>
)



