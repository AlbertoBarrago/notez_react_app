/**
 * @fileoverview Articles route component for managing notes functionality
 * @module ArticlesRoute
 */

import Layout from "../components/layout/index.jsx";
import {Notes} from "@/components/notes.jsx";
import {useEffect, useState, useRef} from "react";
import NotesService from "@/services/notes/index.js";
import NoteEditModal from "@/components/dialogs/edit_notes.jsx";
import NoteDeleteModal from "@/components/dialogs/delete_notes.jsx";
import NoteAddNoteModal from "@/components/dialogs/add_notes.jsx";
import {Button} from "@/components/ui/button.jsx";
import AuthService from "@/services/auth/index.js";

/**
 * @typedef {Object} Note
 * @property {string} id - Unique identifier for the note
 * @property {string} title - Title of the note
 * @property {string} content - Content of the note
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
    /** @type {[Array<Note>, Function]} Notes state and setter */
    const [notes, setNotes] = useState([]);
    /** @type {[boolean, Function]} Loading state and setter */
    const [loading, setLoading] = useState(true);
    /** @type {React.MutableRefObject} Cache for notes data */
    const notesCache = useRef(null);
    /** @type {[boolean, Function]} Modal states and setters */
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    /** @type {[Note|null, Function]} Selected note state and setter */
    const [selectedNote, setSelectedNote] = useState(null)

    /**
     * Fetches notes from the service
     * @async
     * @param {boolean} isUpdateOrDelete - Flag to force refresh cache
     */
    const fetchNotes = async (isUpdateOrDelete = false) => {
        if (notesCache.current && !isUpdateOrDelete) {
            setNotes(notesCache.current);
            return;
        }

        try {
            const notesFetched = await noteService.getNotes();
            if (notesFetched) {
                notesCache.current = notesFetched;
                setNotes(notesFetched);
            }
        } catch (error) {
            handleError(error);
        }
    };
    /**
     * Creates a new note
     * @async
     * @param {newNote: {title,content}} note - Note to create
     */
    const createNotes = async (note) => {
        try {
            await noteService.addNote(note).finally(() => {
                fetchNotes(true);
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
                fetchNotes(true);
            });
        } catch (error) {
            handleError(error, "Error updating note. Please try again.");
        }
    }
    /**
     * Deletes a note
     * @async
     * @param {Note} note - Note to delete
     */
    const deleteNote = async (note) => {
        try {
            await noteService.removeNote(note).finally(() => {
                fetchNotes(true);
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
        }

        const errorMessage = message || error.message || 'An unexpected error occurred';
        console.error(errorMessage, error);
        throw error;
    };

    useEffect(() => {
        fetchNotes().finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Button
                className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
                onClick={handleCreateNote}
                variant="secondary"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
                {notes.length > 0 ? (
                    notes.map(note => <Notes key={note.id} note={note} onEdit={handleEditNote}
                                             onDelete={handleDeleteNote}/>)
                ) : (
                    <div>No notes found.</div>
                )}
            </div>
            <NoteAddNoteModal
                isOpen={isModalCreateOpen}
                onClose={() => setIsModalCreateOpen(false)}
                onSave={handleCreateNoteConfirm}
            >
            </NoteAddNoteModal>
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
            ></NoteDeleteModal>
        </Layout>
    );
}
