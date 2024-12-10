export default function Loader({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-700 animate-pulse">{message}</p>
        </div>
    );
}