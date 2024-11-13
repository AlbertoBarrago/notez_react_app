import Layout from "../components/layout/index.jsx";
import {useStateContext} from "@/context/index.jsx";
import {Notes} from "@/components/notes.jsx";
import {useEffect, useState, useRef} from "react";

import NotesService from "@/services/notes/index.js";
import NoteEditModal from "@/components/dialogs/edit_notes.jsx";
import NoteDeleteModal from "@/components/dialogs/delete_notes.jsx";
import NoteAddNoteModal from "@/components/dialogs/add_notes.jsx";
import {Button} from "@/components/ui/button.jsx";

const noteService = new NotesService();

export default function ArticlesRoute() {
    const appContext = useStateContext();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const notesCache = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const [newNote, setNewNote] = useState(null)

    const fetchNotes = async (isUpdateOrDelete = false) => {
        if (notesCache.current && !isUpdateOrDelete) {
            setNotes(notesCache.current);
            setLoading(false);
            return;
        }

        try {
            const notesFetched = await noteService.getNotes();
            if (notesFetched) {
                notesCache.current = notesFetched;
                setNotes(notesFetched);
            }
        }  finally {
            setLoading(false);
        }
    };
    const createNotes = async (note) => {
        try {
            const createdNote = await noteService.addNote(note);
            if (createdNote) {
                console.log("Note created successfully:", createdNote);
                await fetchNotes(true);
            }
        } catch (error) {
            handleError(error, "Error creating note. Please try again.");
        }
    }
    const updateNote = async (note) => {
        try {
            const updatedNote = await noteService.updateNote(note);
            if (updatedNote) {
                console.log("Note updated successfully:", updatedNote);
                await fetchNotes(true);
            }
        } catch (error) {
            handleError(error, "Error updating note. Please try again.");
        }
    }
    const deleteNote = async (note) => {
        try {
            await noteService.removeNote(note).finally(() => {
                fetchNotes(true);
            });
        } catch (error) {
           handleError(error, "Error deleting note. Please try again.");
        }
    }


    const handleEditNote = (note) => {
        setSelectedNote(note)
        setIsModalOpen(true)
    }
    const handleSaveNoteConfirm = (updatedNote) => {
        updateNote(updatedNote).finally(() => {
                setIsModalOpen(false)
                setSelectedNote(null)
            }
        )

    }

    const handleCreateNote = () => {
        setIsModalCreateOpen(true)
    }
    const handleCreateNoteConfirm = (newNote) => {
       setNewNote({
           title: newNote.title,
           content: newNote.content,
       })
        if (newNote) {
            createNotes(newNote).finally(() => {
                setIsModalCreateOpen(false)
                setNewNote(null)
            })
        }
    }

    const handleDeleteNote = (note) => {
        setSelectedNote(note)
        setIsModalDeleteOpen(true)
    }
    const handleDeleteNoteConfirm = () => {
        if (selectedNote) {
            deleteNote(selectedNote).finally(() => {
                setIsModalDeleteOpen(false)
                setSelectedNote(null)
            })
        }
    }

    const handleError = (error, message) => {
        console.error(message, error);
        setError(message);
    };


    useEffect(() => {
        fetchNotes();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
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

            <div className="flex flex-1 flex-col justify-center items-center space-y-5 p-10">
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
