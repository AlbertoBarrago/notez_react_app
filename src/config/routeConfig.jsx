// Optimized lazy imports with preload and prefetch directives
import {lazy, Suspense} from "react";
import AuthService from "@/services/auth/auth.js";
import NotesService from "@/services/notes/notes.js";
import {redirect} from "react-router-dom";
import Loader from '@/components/loader.jsx'


const authService = new AuthService();
const notesService = new NotesService();
const AuthRoute = lazy(() => import(
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "@/routes/login.jsx"
    ));

const PrivateRoute = lazy(() => import(
    /* webpackPrefetch: true */
    "@/routes/privateRoute.jsx"
    ));

const NoteList = lazy(() => import(
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "@/routes/notesList.jsx"
    ));

const Note = lazy(() => import(
    /* webpackPrefetch: true */
    "@/routes/note.jsx"
    ));

const Explore = lazy(() => import(
    /* webpackPrefetch: true */
    "@/routes/exploreList.jsx"
    ));

const ResetPassword = lazy(() => import("@/routes/resetPassword.jsx"));
const ErrorBoundary = lazy(() => import("@/components/error.jsx"));

// Shared Suspense wrapper component for cleaner code
const SuspenseWrapper = ({ children, message }) => (
    <Suspense fallback={<Loader message={message} />}>
        {children}
    </Suspense>
);

const routeConfig = [
    {
        path: "/",
        element: <SuspenseWrapper message="Authenticating..."><AuthRoute /></SuspenseWrapper>,
        loader: ({ request }) => {
            const currentPath = new URL(request.url).pathname;
            return currentPath === "/" ? (authService.isLoggedIn() ? redirect('/notes') : null) : null;
        },
    },
    {
        path: "/",
        element: <SuspenseWrapper message="Loading..."><PrivateRoute /></SuspenseWrapper>,
        children: [
            {
                path: "notes",
                element: <SuspenseWrapper message="Loading Notes..."><NoteList /></SuspenseWrapper>,
                errorElement: <SuspenseWrapper message="Loading Errors"><ErrorBoundary /></SuspenseWrapper>,
                loader: async ({ request }) => await notesService.getNotesForRoutes(request, 'getNotes')
            },
            {
                path: "note/:id",
                element: <SuspenseWrapper message="Loading Note..."><Note /></SuspenseWrapper>,
                errorElement: <SuspenseWrapper message="Loading error..."><ErrorBoundary /></SuspenseWrapper>,
                loader: async ({ params }) => await notesService.getNoteById(params.id)
            },
            {
                path: "explore",
                element: <SuspenseWrapper message="Loading Explore..."><Explore /></SuspenseWrapper>,
                errorElement: <SuspenseWrapper message="Loading error..."><ErrorBoundary /></SuspenseWrapper>,
                loader: async ({ request }) => await notesService.getNotesForRoutes(request, 'getPublicNotes')
            },
            {
                path: "reset/password",
                element: <SuspenseWrapper message="Reset Password..."><ResetPassword /></SuspenseWrapper>,
                errorElement: <SuspenseWrapper message="Loading error..."><ErrorBoundary /></SuspenseWrapper>,
            }
        ]
    },
    {
        path: "*",
        element: <h1>404 - Page Not Found</h1>
    }
];

export default routeConfig;
