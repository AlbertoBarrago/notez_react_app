import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './style.css';
import {ContextProvider} from "@/context/theme.jsx";
import { Toaster } from 'sonner';
import routeConfig from "@/config/routeConfig.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RouterProvider router={createBrowserRouter(routeConfig)}/>
           <Toaster/>
        </ContextProvider>
    </React.StrictMode>
)
