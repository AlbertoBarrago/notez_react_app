import {Note} from "@/components/note.jsx";
import {useLoaderData} from "react-router-dom";
import {useLayoutEffect, useRef, useState} from "react";
import {cardAnimation} from "@/lib/animation.js";
export default function NoteDetails() {
    const initialData = useLoaderData()
    const [note] = useState(initialData)
    const noteRef = useRef(null)

    useLayoutEffect(() => {
        cardAnimation(noteRef.current)
    },[])

    return (
        <Note note={note} ref={noteRef}/>
    )
}