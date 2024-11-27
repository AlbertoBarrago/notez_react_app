import {NoteElement} from "@/components/noteElement.jsx";
import {useLoaderData} from "react-router-dom";
import NotesService from "@/services/notes/notes.js";
import {useCallback, useEffect, useState} from "react";
const noteService = new NotesService();
export function Note() {
    const initialData = useLoaderData()
    const [note, setNote] = useState({})

    const fetchNote = useCallback(async () => {
        return noteService.getNoteById(initialData.id);
    }, [initialData])

    useEffect(() => {
        fetchNote().finally(() => setNote(initialData))
    },[fetchNote])

    return (
        <NoteElement note={note}/>
    )
}