/**
 * @fileoverview Articles route component for managing notes functionality
 * @module ArticlesRoute
 */

import Layout from "../components/layout/layout.jsx";
import {NotesCard} from "@/components/notesCard.jsx";
import {useEffect, useState, useCallback} from "react";
import NotesService from "@/services/notes/notes.js";
import AuthService from "@/services/login/login.js";
import {FilterSearch} from "@/components/filterSearch.jsx";
import {useLoaderData, useNavigate, useNavigation} from "react-router-dom";
import ErrorMessage from "@/components/error.jsx";
import PaginationControls from "@/components/pagination.jsx";


/**
 * @typedef {Object} Note
 * @property {string} id - Unique identifier for the note
 * @property {string} title - Title of the note
 * @property {string} content - Content of the note
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Array<Note>} items - Array of notes
 * @property {number} page - Current page number
 * @property {number} page_size - Number of items per page
 * @property {number} total - Total number of items
 * @property {number} total_pages - Total number of pages
 */

/**
 * @constant {NotesService}
 */
const noteService = new NotesService();
const authService = new AuthService();

/**
 * Main part for displaying and managing notes
 * @function ArticlesRoute
 * @returns {JSX.Element} Rendered component
 */
export default function ExploreRoute() {
    const navigate = useNavigate()
    const initialData = useLoaderData()
    const navigation = useNavigation()
    const [notes, setNotes] = useState(initialData.items);
    const loading = navigation.state === "loading";
    const [query, setQuery] = useState("");
    const [pagination, setPagination] = useState({
        total: initialData.total,
        page: initialData.page,
        page_size: initialData.page_size,
        total_pages: initialData.total_pages,
    })
    const [error, setError] = useState(null)
    const [isInitialLoad, setIsInitialLoad] = useState(true);


    /**
     * Fetches paginated notes from the server and updates state
     * @type {() => Promise<void>}
     * @function
     * @async
     * @returns {Promise<void>}
     * @throws {Error} When the API request fails
     */
    const fetchNotes = useCallback(async () => {
        try {
            const notesFetched = await noteService.getPublicNotes(pagination.page, pagination.page_size, query);
            if (notesFetched) {
                setNotes(notesFetched.items);
                setPagination({
                    page: notesFetched.page,
                    page_size: notesFetched.page_size,
                    total: notesFetched.total,
                    total_pages: notesFetched.total_pages,
                });
            }
        } catch (error) {
            handleError(error);
        }
    }, [pagination.page, pagination.page_size, query]);

    /**
     * Error handler for note operations
     * @param {{status?: number, message?: string}} error - Error object with status and message
     * @param {string} [message] - Optional custom error message
     * @throws {Error} Rethrows the error after handling
     */
    const handleError = (error, message) => {
        switch (error.status) {
            case 401:
            case 403:
            case 429:
                authService.logout();
                navigate('/');
                break;
        }

        const errorMessage = message || error.message || 'An unexpected error occurred';
        setError(errorMessage)
        console.error(errorMessage, error);
    };

    const handleNoteClick = (note) => {
        const source = location.pathname === '/explore' ? 'explore' : 'notes';
        navigate(`/note/${note.id}?from=${source}`);
    };

    useEffect(() => {
        if(isInitialLoad){
            setIsInitialLoad(false);
            return;
        }
        fetchNotes()
    }, [pagination.page, pagination.page_size, query]);

    return (
        <Layout>
            {error && <ErrorMessage message={error}/>}
            {notes ? <FilterSearch onSearch={(q) => setQuery(q)} initialValue={query}/> : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mx-auto p-5">
                {loading ? (
                    Array(pagination.page_size).fill(null).map((_, index) => (
                        <div key={`skeleton-${index}`}
                             className="border-2 rounded-xl p-6 shadow-md min-h-[200px] bg-secondary/50">
                            <div className="animate-pulse space-y-6">
                                <div className="h-6 bg-primary/20 rounded-lg w-3/4"></div>

                                <div className="space-y-3">
                                    <div className="h-4 bg-primary/20 rounded-lg w-full"></div>
                                    <div className="h-4 bg-primary/20 rounded-lg w-5/6"></div>
                                    <div className="h-4 bg-primary/20 rounded-lg w-4/6"></div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-4">
                                    <div className="h-8 w-8 bg-primary/20 rounded-full"></div>
                                    <div className="h-8 w-8 bg-primary/20 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : notes.length > 0 ? (
                    notes.map(note => (
                        <NotesCard
                            key={note.id}
                            note={note}
                            onEdit={null}
                            onDelete={null}
                            onClick={() => {handleNoteClick(note)}}
                            justReadable={true}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex items-center justify-center text-center mt-40">
                        <p className="text-primary-400 text-2xl">Add some notes Dude, press the <br/> button below with symbol <code>+</code></p>
                    </div>
                )}
            </div>

            {notes.length > 0 && (
                <div className="flex items-center justify-center">
                    <PaginationControls
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </div>
            )}
        </Layout>
    );
}