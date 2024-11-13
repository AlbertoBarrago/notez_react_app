import Layout from "../components/layout/index.jsx";
import { useStateContext } from "@/context/index.jsx";
import { Notes } from "@/components/notes.jsx";
import NotesService from "@/services/notes/index.js";
import { useEffect, useState, useRef } from "react";

const noteService = new NotesService();

export default function ArticlesRoute() {
    const appContext = useStateContext();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const notesCache = useRef(null);

    useEffect(() => {
        const fetchNotes = async () => {
            if (notesCache.current) {
                setNotes(notesCache.current);
                setLoading(false);
                return;
            }

            try {
                const notesFetched = await noteService.getNotes();
                if (notesFetched) {
                    console.log(notesFetched);
                    notesCache.current = notesFetched; // Memorizza la risposta in cache
                    setNotes(notesFetched);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
                setError("Error fetching notes. Please try again.");
            } finally {
                setLoading(false);
            }
        };
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
                    notes.map(note => <Notes key={note.id} note={note} />)
                ) : (
                    <div>No notes found.</div>
                )}
            </div>
        </Layout>
    );
}
