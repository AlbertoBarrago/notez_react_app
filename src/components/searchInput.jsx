import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.jsx";

export function SearchInput({onSearch, initialValue = ""}) {
    const [searchTerm, setSearchTerm] = useState(initialValue)

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm.length === 0 || searchTerm.length >= 3) {
                onSearch(searchTerm)
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, onSearch]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="flex items-center space-x-2 w-full max-w-[990px] mx-auto mt-5 px-4 md:px-0">
            <Input
                type="text"
                placeholder="Search notes (min. 3 characters)"
                value={searchTerm}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500 focus:shadow-outline-primary"
                inputMode="search"
                autoCapitalize="none"
                autoComplete="off"
            />
        </div>
    )
}