import Layout from "../components/layout/index.jsx";
import {useStateContext} from "@/context/index.jsx";
import {Notes} from "@/components/notes.jsx";

export default function Articles() {
    const appContext = useStateContext();
    return (
        <>
            <Layout>
                <div className="flex-1 flex flex-col justify-center items-center space-y-4">
                    <h1 className="text-3xl text-center">Articles</h1>
                    <Notes/>
                    <Notes/>
                </div>
            </Layout>
        </>
    )
}