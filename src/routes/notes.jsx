/**
 * @fileoverview Articles route component for managing notes functionality
 * @module ArticlesRoute
 */

import Layout from "../components/layout/index.jsx";
import {NotesCard} from "@/components/notesCard.jsx";
import {useEffect, useState, useCallback} from "react";
import NotesService from "@/services/notes/index.js";
import NoteEditModal from "@/components/dialogs/edit_notes.jsx";
import NoteDeleteModal from "@/components/dialogs/delete_notes.jsx";
import NoteAddNoteModal from "@/components/dialogs/add_notes.jsx";
import {Button} from "@/components/ui/button.jsx";
import AuthService from "@/services/login/index.js";
import {PlusIcon} from "lucide-react";
import {
    PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";
import {SearchInput} from "@/components/searchInput.jsx";
import {useNavigate} from "react-router-dom";

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
export default function ArticlesRoute() {
    const navigate = useNavigate()
    /** @type {[Array<Note>, Function]} NotesCard state and setter */
    const [notes, setNotes] = useState([]);
    /** @type {[boolean, Function]} Loading state and setter */
    const [loading, setLoading] = useState(false);
    /** @type {React.MutableRefObject} Cache for notes data */
    /** @type {[boolean, Function]} Modal states and setters */
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    /** @type {[Note|null, Function]} Selected note state and setter */
    const [selectedNote, setSelectedNote] = useState(null)
    const [query, setQuery] = useState("");
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        page_size: 8,
        total_pages: 0,
    });


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
            setLoading(true);
            const notesFetched = await noteService.getNotes(pagination.page, pagination.page_size, query);
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
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.page_size, query]);
    /**
     * Creates a new note
     * @async
     * @param {newNote: {title,content} | undefined} note - Note to create
     */
    const createNotes = async (note) => {
        try {
            await noteService.addNote(note).finally(() => {
                fetchNotes();
            });
        } catch (error) {
            handleError(error, "Error creating note. Please try again.");
        }
    }
    /**
     * Updates an existing note
     * @async
     * @param {Note} note - Note to update
     */
    const updateNote = async (note) => {
        try {
            await noteService.updateNote(note).finally(() => {
                fetchNotes()
            });
        } catch (error) {
            handleError(error, "Error updating note. Please try again.");
        }
    }
    /**
     * Deletes a note
     * @async
     * @param {string} note_id - Note to delete
     */
    const deleteNote = async (note_id) => {
        try {
            await noteService.removeNote(note_id).finally(() => {
                fetchNotes();
            });
        } catch (error) {
            handleError(error, "Error deleting note. Please try again.");
        }
    }
    /**
     * Handles note edit action
     * @param {Note} note - Note to edit
     */
    const handleEditNote = (note) => {
        setSelectedNote(note)
        setIsModalOpen(true)
    }
    /**
     * Handles note creation action
     */
    const handleSaveNoteConfirm = (updatedNote) => {
        updateNote(updatedNote).finally(() => {
                setIsModalOpen(false)
                setSelectedNote(null)
            }
        )

    }
    /**
     * Handles note creation action
     */
    const handleCreateNote = () => {
        setIsModalCreateOpen(true)
    }
    /**
     * Handles note creation action
     * @param newNoteParam {newNoteParam: {title, content}}
     */
    const handleCreateNoteConfirm = (newNoteParam) => {
        const newNoteCasted = ({
            title: newNoteParam.title,
            content: newNoteParam.content,
        })
        createNotes(newNoteCasted).finally(() => {
            setIsModalCreateOpen(false)
        })
    }
    /**
     * Handles note deletion action
     * @param {Note} note - Note to delete
     */
    const handleDeleteNote = (note) => {
        setSelectedNote(note)
        setIsModalDeleteOpen(true)
    }
    /**
     * Handles note deletion confirmation
     */
    const handleDeleteNoteConfirm = () => {
        if (selectedNote) {
            deleteNote(selectedNote).finally(() => {
                setIsModalDeleteOpen(false)
                setSelectedNote(null)
            })
        }
    }
    /**
     * Error handler for note operations
     * * @param {{status?: number, message?: string}} error - Error object with status and message     * @param {string} [message] - Optional custom error message
     * @throws {Error} Rethrows the error after handling
     */
    const handleError = (error, message) => {
        if (error.status === 401) {
            authService.logout();
            navigate.push('/login');
        }

        if (error.status === 403) {
            authService.logout();
            navigate.push('/login');
        }

        if (error.status === 429) {
            authService.logout();
            navigate.push('/login');
        }

        const errorMessage = message || error.message || 'An unexpected error occurred';
        console.error(errorMessage, error);
        throw error;
    };

    useEffect(() => {
        fetchNotes()
    }, []);


    useEffect(() => {
        fetchNotes()
    }, [pagination.page, pagination.page_size, query]);


    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center mt-40">
                    <div className="animate-spin rounded-full border-t-2 border-primary h-8 w-8"></div>
                    <p className="text-gray-600 ml-2">Loading...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SearchInput onSearch={(q) => setQuery(q)} initialValue={query}/>
            {notes.length > 0 ? (
                <>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mx-auto p-5">
                        {notes.map(note =>
                            <NotesCard key={note.id}
                                       note={note}
                                       onEdit={handleEditNote}
                                       onDelete={handleDeleteNote}/>
                        )}
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <PaginationContent>
                            {pagination.page > 1 && (
                                <PaginationPrevious
                                    onClick={() => {
                                        setPagination({
                                            ...pagination,
                                            page: Math.max(1, pagination.page - 1)
                                        })
                                    }}
                                />
                            )}

                            <PaginationItem>
                                <PaginationLink
                                    isActive={pagination.page === 1}
                                    onClick={() => setPagination({...pagination, page: 1})}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            {pagination.total_pages > 3 && (
                                <>
                                    {pagination.page > 2 && <PaginationEllipsis/>}
                                    {pagination.page > 1 && pagination.page < pagination.total_pages && (
                                        <PaginationItem>
                                            <PaginationLink isActive={true}>
                                                {pagination.page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    {pagination.page < pagination.total_pages - 1 && <PaginationEllipsis/>}
                                </>
                            )}

                            {pagination.total_pages > 1 && (
                                <PaginationItem>
                                    <PaginationLink
                                        isActive={pagination.page === pagination.total_pages}
                                        onClick={() => setPagination({...pagination, page: pagination.total_pages})}
                                    >
                                        {pagination.total_pages}
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            {pagination.page < pagination.total_pages && (
                                <PaginationNext
                                    onClick={() => {
                                        setPagination({
                                            ...pagination,
                                            page: Math.min(pagination.total_pages, pagination.page + 1)
                                        })
                                    }}
                                />
                            )}
                        </PaginationContent>
                    </div>
                </>
            ) : (
                <div className={"flex items-center mt-40 justify-center"}>
                    <p className={"text-primary animate-pulse"}> &#215; No Notes Found</p>
                </div>
            )}

            <Button
                className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg"
                onClick={handleCreateNote}
                variant="secondary"
                size="icon">
                <PlusIcon className="h-6 w-6"/>
            </Button>

            <NoteAddNoteModal
                isOpen={isModalCreateOpen}
                onClose={() => setIsModalCreateOpen(false)}
                onSave={handleCreateNoteConfirm}
            />

            <NoteEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNoteConfirm}
                note={selectedNote}
            />

            <NoteDeleteModal
                isOpen={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                onDelete={handleDeleteNoteConfirm}
                note={selectedNote}
            />
        </Layout>
    );
}
