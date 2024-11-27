import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import NoteList from "./routes/notesList.jsx";
import Explore from "./routes/explore.jsx";
import './style.css';
import {ContextProvider} from "@/context/theme.jsx";
import AuthRoute from "@/routes/login.jsx";
import PrivateRoute from "@/routes/privateRoute.jsx";
import AuthService from "@/services/login/login.js";
import ResetPassword from "@/routes/resetPassword.jsx";
import {Note} from "@/routes/note.jsx";
import NotesService from "@/services/notes/notes.js";
import ErrorBoundary from "@/components/error.jsx";

const publicPath = '/';
const authService = new AuthService();

/**
 * @constant {NotesService}
 * @type {{PAGE_SIZE: number, INITIAL_PAGE: number}}
 */
const PAGINATION_DEFAULTS = {
    PAGE_SIZE: 8,
    INITIAL_PAGE: 1,
    DESC_ORDER: 'desc'
}


const getNotes = async (request, funcName) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || PAGINATION_DEFAULTS.INITIAL_PAGE;
    const pageSize = PAGINATION_DEFAULTS.PAGE_SIZE;
    const sort = PAGINATION_DEFAULTS.DESC_ORDER;
    const query = url.searchParams.get("query") || "";

    const noteService = new NotesService();
    return noteService[funcName](page, pageSize, query, sort);
}

const routeConfig = [
    {
        path: publicPath,
        element: <AuthRoute/>,
        loader: () => authService.isLoggedIn() ? redirect('/notes') : null,
    },
    {
        path: "/",
        element: <PrivateRoute/>,
        children: [
            {
                path: "notes",
                element: <NoteList/>,
                errorElement: <ErrorBoundary/>,
                loader: async ({request}) => {
                    return await getNotes(request, 'getNotes');
                }
            },
            {
                path: "note/:id",
                element: <Note/>,
                errorElement: <ErrorBoundary/>,
            },
            {
                path: "explore", element: <Explore/>,
                errorElement: <ErrorBoundary/>,
                loader: async ({request}) => {
                    return await getNotes(request, 'getPublicNotes');
                }
            },
            {path: "reset/password/:token", element: <ResetPassword/>},
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
