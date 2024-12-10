export default function Loader({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-full mt-40 space-y-4">
            <div className="w-12 h-12 border-4 primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-700 animate-pulse">{message}</p>
        </div>
    );
}