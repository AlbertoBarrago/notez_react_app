import Index from "../components/layout/index.jsx";
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <>
            <Index>
                <h1 className="mt-2">Home</h1>
                <Button>Click me</Button>
            </Index>
        </>
    )
}