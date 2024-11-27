import Layout from "@/components/layout/layout.jsx";

export function NoteElement({note}) {
    // console.log(note);
    return (
        <Layout>
            {/*{note.title}*/}
            {/*{note.content}*/}
            <h1 className='text-2xl flex animate-pulse'>Working on...</h1>
        </Layout>
    )
}