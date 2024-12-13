import {NoteElement} from "@/components/noteElement.jsx";
import {useLoaderData} from "react-router-dom";
import {useState} from "react";
export default function Note() {
    const initialData = useLoaderData()
    const [note] = useState(initialData)


    return (
        <NoteElement note={note}/>
    )
}