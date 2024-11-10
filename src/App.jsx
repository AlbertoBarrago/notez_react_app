import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Articles from "./routes/articles";
import About from "./routes/about";
import Contact from "./routes/contact";
import './index.css';
import {ContextProvider} from "@/context/index.jsx";

const publicPath = import.meta.env.VITE_BASE_URL || '/';

const routes = createBrowserRouter([
    {
        path: publicPath,
        element: <Articles/>,
    },
    {
        path: publicPath + "/about",
        element: <About/>,
    },
    {
        path: publicPath + "/contact",
        element: <Contact/>,
    },
    {
        path: "*",
        element: <h1>404 - Page Not Found</h1>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RouterProvider router={routes}/>
        </ContextProvider>
    </React.StrictMode>
)



