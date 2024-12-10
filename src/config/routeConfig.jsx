import AuthService from "@/services/auth/auth.js";
import NotesService from "@/services/notes/notes.js";
import {redirect} from "react-router-dom";

const publicPath = '/';
const authService = new AuthService();
const notesService = new NotesService();

import React, { Suspense } from "react";
import Loader from '@/components/loader.jsx'

const AuthRoute = React.lazy(() => import("@/routes/login.jsx"));
const PrivateRoute = React.lazy(() => import("@/routes/privateRoute.jsx"));
const NoteList = React.lazy(() => import("@/routes/notesList.jsx"));
const Explore = React.lazy(() => import("@/routes/explore.jsx"));
const ResetPassword = React.lazy(() => import("@/routes/resetPassword.jsx"));
const ErrorBoundary = React.lazy(() => import("@/components/error.jsx"));
const Note = React.lazy(() => import("@/routes/note.jsx"));


const routeConfig = [
    {
        path: publicPath,
        element: (
            <Suspense fallback={<Loader message="Authenticating..." />}>
                <AuthRoute />
            </Suspense>
        ),
        loader: ({ request }) => {
            const currentPath = new URL(request.url).pathname;
            if (currentPath === "/") {
                return authService.isLoggedIn() ? redirect('/notes') : null;
            }
            return null;
        },
    },
    {
        path: "/",
        element: (
            <Suspense fallback={<Loader message="Loading..." />}>
                <PrivateRoute />
            </Suspense>
        ),
        children: [
            {
                path: "notes",
                element: (
                    <Suspense fallback={<Loader message="Loading Notes..." />}>
                        <NoteList />
                    </Suspense>
                ),
                errorElement: (
                    <Suspense fallback={<Loader message="Loading Errors" />}>
                        <ErrorBoundary />
                    </Suspense>
                ),
                loader: async ({ request }) => {
                    return await notesService.getNotesForRoutes(request, 'getNotes');
                }
            },
            {
                path: "note/:id",
                element: (
                    <Suspense fallback={<Loader message="Loading Note..." />}>
                        <Note />
                    </Suspense>
                ),
                errorElement: (
                    <Suspense fallback={<Loader message="Loading error..." />}>
                        <ErrorBoundary />
                    </Suspense>
                ),
                loader: async ({ params }) => {
                    const { id } = params;
                    return notesService.getNoteById(id);
                }
            },
            {
                path: "explore",
                element: (
                    <Suspense fallback={<Loader message="Loading Explore..." />}>
                        <Explore />
                    </Suspense>
                ),
                errorElement: (
                    <Suspense fallback={<Loader message="Loading error..." />}>
                        <ErrorBoundary />
                    </Suspense>
                ),
                loader: async ({ request }) => {
                    return await notesService.getNotesForRoutes(request, 'getPublicNotes');
                }
            },
            {
                path: "reset/password",
                element: (
                    <Suspense fallback={<Loader message="Reset Password..." />}>
                        <ResetPassword />
                    </Suspense>
                ),
                errorElement: (
                    <Suspense fallback={<Loader message="Loading error..." />}>
                        <ErrorBoundary />
                    </Suspense>
                ),
            }
        ]
    },
    {
        path: "*",
        element: <h1>404 - Page Not Found</h1>
    }
];


export default routeConfig;