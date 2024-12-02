import AuthService from "@/services/auth/auth.js";
import NotesService from "@/services/notes/notes.js";
import AuthRoute from "@/routes/login.jsx";
import {redirect} from "react-router-dom";
import PrivateRoute from "@/routes/privateRoute.jsx";
import NoteList from "@/routes/notesList.jsx";
import ErrorBoundary from "@/components/error.jsx";
import {Note} from "@/routes/note.jsx";
import Explore from "@/routes/explore.jsx";
import ResetPassword from "@/routes/resetPassword.jsx";

const publicPath = '/';
const authService = new AuthService();
const notesService = new NotesService();

const routeConfig = [
    {
        path: publicPath,
        element: <AuthRoute/>,
        loader: ({request}) => {
            const currentPath = new URL(request.url).pathname;
            if (currentPath === "/") {
                return authService.isLoggedIn() ? redirect('/notes') : null;
            }
            return null;
        },
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
                    return await notesService.getNotesForRoutes(request, 'getNotes');
                }
            },
            {
                path: "note/:id",
                element: <Note/>,
                errorElement: <ErrorBoundary/>,
                loader: async ({params}) => {
                    const { id } = params;
                    if (!id) {
                        throw new Error("Invalid note ID");
                    }
                    return notesService.getNoteById(id);
                }
            },
            {
                path: "explore",
                element: <Explore/>,
                errorElement: <ErrorBoundary/>,
                loader: async ({request}) => {
                    return await notesService.getNotesForRoutes(request, 'getPublicNotes');
                }
            },
            {
                path: "reset/password",
                element: <ResetPassword/>,
                errorElement: <ErrorBoundary/>,
            }
        ]
    },
    {
        path: "*",
        element: <h1>404 - Page Not Found</h1>
    }
];

export default routeConfig;