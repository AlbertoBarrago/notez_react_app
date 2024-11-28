import Layout from "@/components/layout/layout.jsx";
import {useEffect, useRef} from "react";
import {cardTitleAnimation} from "@/lib/animation.js";
import {ArrowLeftCircle} from "lucide-react";
import {useNavigate} from "react-router-dom";


export function NoteElement({note}) {
    const noteRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        cardTitleAnimation(noteRef.current);
    }, []);


    return (
        <Layout>
            <div className="max-w-3xl mx-auto px-4 py-10" ref={noteRef}>
                <button className="flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground" onClick={()=>navigate('/notes')}>
                    <ArrowLeftCircle /> Back
                </button>
                <article className="prose dark:prose-invert max-w-none">
                    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-6">
                        {note.title}
                    </h1>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
                        <time dateTime={note.created_at}>Created: {new Date(note.created_at).toLocaleString('it-IT')}</time>
                        <span>•</span>
                        <time dateTime={note.updated_at}>Last edited: {new Date(note.updated_at).toLocaleString('it-IT')}</time>
                    </div>

                    <div className="leading-7 [&:not(:first-child)]:mt-6">
                        {note.content}
                    </div>
                </article>
            </div>
        </Layout>    )
}
