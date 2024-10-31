import Layout from "../components/layout/index.jsx";
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <>
            <Layout>
                <h1 className="mt-2">Home</h1>
                <Button>Click me</Button>
            </Layout>
        </>
    )
}