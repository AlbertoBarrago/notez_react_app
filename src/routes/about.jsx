import Layout from "../components/layout/index.jsx";
import {useStateContext} from "@/context/index.jsx";

export default function About() {
    const appContext = useStateContext();

    return (
        <Layout>
            <h1 className="text-3xl text-center">About</h1>
        </Layout>
    )
}