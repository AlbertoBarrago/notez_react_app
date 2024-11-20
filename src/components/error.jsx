export function ErrorMessage({ message }) {
    return (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <span className="font-medium">Error:</span> {message}
        </div>
    )
}