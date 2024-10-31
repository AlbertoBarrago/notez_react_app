import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Articles from "./routes/articles.jsx";
import About from "./routes/about.jsx";
import Contact from "./routes/contact.jsx";
import './index.css';

const publicPath = import.meta.env.VITE_BASE_URL || '/';

const router = createBrowserRouter([
    {
        path: publicPath,
        element: <Articles />,
    },
    {
        path: publicPath + "/about",
        element: <About />,
    },
    {
        path: publicPath + "/contact",
        element: <Contact />,
    },
    {
        path: "*",
        element: <h1>404 - Page Not Found</h1>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)



