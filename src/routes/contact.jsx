import Layout from "../components/layout/index.jsx";
import {useStateContext} from "@/context/index.jsx";

export default function Contact() {
    const appContext = useStateContext();

    return (
        <Layout>
            <h1 className="text-3xl text-center">Contact</h1>
        </Layout>
    )
}