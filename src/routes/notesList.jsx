/**
 * @fileoverview Articles route component for managing notes functionality
 * @module ArticlesRoute
 */

import Layout from "../components/layout/layout.jsx";
import {NotesCard} from "@/components/notesCard.jsx";
import {useEffect, useState, useCallback} from "react";
import NotesService from "@/services/notes/notes.js";
import NoteEditModal from "@/components/dialogs/edit_notes.jsx";
import NoteDeleteModal from "@/components/dialogs/delete_notes.jsx";
import NoteAddNoteModal from "@/components/dialogs/add_notes.jsx";
import {Button} from "@/components/ui/button.jsx";
import AuthService from "@/services/login/login.js";
import {PlusIcon} from "lucide-react";
import {FilterSearch} from "@/components/filterSearch.jsx";
import {useLoaderData, useNavigate, useNavigation} from "react-router-dom";
import {ErrorMessage} from "@/components/error.jsx";
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

const noteService = new NotesService();
const authService = new AuthService();

/**
 * Main part for displaying and managing notes
 * @function NotesList
 * @returns {JSX.Element} Rendered component
 */
export default function NotesList() {
    const navigate = useNavigate()
    const initialData = useLoaderData()
    const navigation = useNavigation()
    const [notes, setNotes] = useState(initialData.items);
    const routeLoading = navigation.state === "loading"
    const [operationLoading, setOperationLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const [query, setQuery] = useState("");
    const [pagination, setPagination] = useState({
        total: initialData.total,
        page: initialData.page,
        page_size: initialData.page_size,
        total_pages: initialData.total_pages,
    })
    const [error, setError] = useState(null)
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const isLoading = routeLoading || operationLoading


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
            setOperationLoading(true)
            const notesFetched = await noteService.getNotes(pagination.page, pagination.page_size, query, "desc");
            if (notesFetched) {
                setNotes(notesFetched.items);
                setPagination({
                    page: notesFetched.page,
                    page_size: notesFetched.page_size,
                    total: notesFetched.total,
                    total_pages: notesFetched.total_pages,
                });
                setOperationLoading(false)
            }
        } catch (error) {
            handleError(error);
            setOperationLoading(false)
        }
    }, [pagination.page, pagination.page_size, query]);
    /**
     * Creates a new note
     * @async
     * @param {newNote: {title,content} | undefined} note - NoteElement to create
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
     * @param {Note} note - NoteElement to update
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
     * @param {string} note_id - NoteElement to delete
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
     * @param {Note} note - NoteElement to edit
     */
    const memoizedHandleEditNote = useCallback((note) => {
        setSelectedNote(note)
        setIsModalOpen(true)
    }, [])
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
     * @param {Note} note - NoteElement to delete
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
                if(notes.length < 5) {
                    setPagination({
                        ...pagination,
                        page: 1,
                    })
                }
            })
        }
    }
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
                alert(error.message);
                authService.logout();
                navigate('/');
                break;
        }

        const errorMessage = message || error.message || 'An unexpected error occurred';
        setError(errorMessage)
        console.error(errorMessage, error);
    };

    useEffect(() => {
        if(isInitialLoad) {
            setIsInitialLoad(true);
            return;
        }
        fetchNotes()
    }, [pagination.page, pagination.page_size, query]);

    return (
        <Layout>
            {error && <ErrorMessage message={error}/>}
            {notes ? <FilterSearch onSearch={(q) => setQuery(q)} initialValue={query}/> : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mx-auto p-5">
                {isLoading ? (
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
                            onEdit={memoizedHandleEditNote}
                            onDelete={handleDeleteNote}
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

            <Button
                className={`fixed bottom-6 right-6 rounded-full p-4 shadow-lg ${notes.length === 0 ? 'animate-pulse' : ''}`}
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