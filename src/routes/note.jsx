import {NoteElement} from "@/components/noteElement.jsx";
import {useLoaderData} from "react-router-dom";
import {useRef, useState} from "react";
import {cardTitleAnimation} from "@/lib/animation.js";
export default function Note() {
    const noteRef = useRef(null);
    const initialData = useLoaderData()
    const [note] = useState(initialData)

    cardTitleAnimation(noteRef.current);

    return (
        <NoteElement note={note} ref={noteRef}/>
    )
}