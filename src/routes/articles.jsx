import Layout from "../components/layout/index.jsx";
import {useStateContext} from "@/context/index.jsx";
import {Notes} from "@/components/notes.jsx";
import {useEffect, useState, useRef} from "react";

import NotesService from "@/services/notes/index.js";
import NoteEditModal from "@/components/edit_modal.jsx";

const noteService = new NotesService();

export default function ArticlesRoute() {
    const appContext = useStateContext();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const notesCache = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)

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
        } catch (error) {
            console.error('Error fetching notes:', error);
            setError("Error fetching notes. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const updateNote = async (note) => {
        try {
            const updatedNote = await noteService.updateNote(note);
            if (updatedNote) {
                await fetchNotes(true);
            }
        } catch (error) {
            console.error('Error updating note:', error);
            setError("Error updating note. Please try again.");
        }
    }

    const handleEditNote = (note) => {
        setSelectedNote(note)
        setIsModalOpen(true)
    }

    const handleSaveNote = (updatedNote) => {
        console.log('Saving updated note:', updatedNote)
        updateNote(updatedNote).finally(() => {
                setIsModalOpen(false)
            }
        )

    }

    const deleteNote = async (note) => {
        try {
            await noteService.removeNote(note).finally(()=>{
                fetchNotes(true);
            });
        } catch (error) {
            console.error('Error deleting note:', error);
            setError("Error deleting note. Please try again.");
        }
    }

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
            <div className="flex flex-1 flex-col justify-center items-center space-y-5 p-10">
                {notes.length > 0 ? (
                    notes.map(note => <Notes key={note.id} note={note} onEdit={handleEditNote} onDelete={deleteNote}/>)
                ) : (
                    <div>No notes found.</div>
                )}
            </div>
            <NoteEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNote}
                note={selectedNote}
            />
        </Layout>
    );
}
