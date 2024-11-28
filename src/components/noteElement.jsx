import Layout from "@/components/layout/layout.jsx";


export function NoteElement({note}) {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                <h1
                    className="text-4xl font-bold mb-4"
                >
                    {note.title}
                </h1>

                <div
                    className="prose dark:prose-invert max-w-none"
                >
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Created: {note.created_at} <br/>
                        Last edited: {note.updated_at}
                    </div>

                    <div className="mt-6">
                        {note.content}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
