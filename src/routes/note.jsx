import {NoteElement} from "@/components/noteElement.jsx";
import {useLoaderData, useNavigate, useNavigation} from "react-router-dom";

export function Note() {
    const navigate = useNavigate()
    const initialData = useLoaderData()
    const navigation = useNavigation()

    console.log(navigate)
    console.log(initialData)
    console.log(navigation)

    return (
        <NoteElement/>
    )
}