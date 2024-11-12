import Layout from "../components/layout/index.jsx";
import {useStateContext} from "@/context/index.jsx";
import {Notes} from "@/components/notes.jsx";

export default function ArticlesRoute() {
    const appContext = useStateContext();
    console.log("Active theme ->", appContext.theme)
    return (
        <Layout>
            <div className="flex-1 flex flex-col justify-center items-center space-y-5">
                <Notes/>
                <Notes/>
            </div>
        </Layout>
    )
}