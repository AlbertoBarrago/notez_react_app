import Layout from "@/components/layout/layout.jsx";
import {ArrowLeftCircle, Globe, Lock} from "lucide-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Badge} from "@/components/ui/badge.jsx";
import {forwardRef} from "react";

export const Note = forwardRef(({ note }, ref) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fromPage = searchParams.get('from');


    const handleBack = () => {
        navigate(`/${fromPage}`);
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto px-4 py-10">
                <button className="flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground"
                        onClick={handleBack}>
                    <ArrowLeftCircle/> Back to {fromPage}
                </button>
                <article className="prose dark:prose-invert max-w-none" ref={ref}>
                    <div className="flex items-center gap-4 mb-6">
                        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight m-0">
                            {note.title}
                        </h1>
                        {note?.is_public ?
                            <Globe className="w-6 h-6 text-primary flex-shrink-0" /> :
                            <Lock className="w-6 h-6 text-primary flex-shrink-0" />
                        }
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
                        <time dateTime={note.created_at}>
                            Created: {new Date(note.created_at).toLocaleString('it-IT')}
                        </time>
                        <span>•</span>
                        <time dateTime={note.updated_at}>
                            Last edited: {new Date(note.updated_at).toLocaleString('it-IT')}
                        </time>
                    </div>

                    {note.image_url && (
                        <img
                            src={note.image_url}
                            alt="Note image"
                            className="w-full h-auto rounded-lg mb-8 object-cover max-h-[400px]"
                        />
                    )}

                    <div className="leading-7 [&:not(:first-child)]:mt-6">
                        {note.content}
                    </div>

                    {note?.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-8">
                            {note.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </article>
            </div>
        </Layout>
    );
});

Note.displayName = 'Note';

