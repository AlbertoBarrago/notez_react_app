import {version} from "../../../../package.json";

export default function Index() {
    return (
        <footer className="text-center p-4 text-sm">
            🥷🏻 {new Date().getFullYear()} - alBz Notez | v{version}
        </footer>
    )
}