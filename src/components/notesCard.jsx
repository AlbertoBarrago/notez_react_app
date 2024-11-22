/**
 * @fileoverview Note card component for displaying individual notes
 * @module Notes
 */

import {useState} from 'react'
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Pencil, Trash2} from "lucide-react"

/**
 * @typedef {Object} Note
 * @property {string} id - Note identifier
 * @property {string} title - Note title
 * @property {string} content - Note content
 * @property {string|Date} created_at - Creation date
 * @property {string|Date} updated_at - Last update date
 */

/**
 * Note card component
 * @function NotesCard
 * @param {Object} props - Component props
 * @param {Note} props.note - Note data
 * @param {Function} props.onEdit - Edit handler callback
 * @param {Function} props.onDelete - Delete handler callback
 * @param {boolean} props.justReadable - Flag to indicate if the note is just readable
 * @returns {JSX.Element} Rendered note card
 */
export function NotesCard({note, onEdit, onDelete, justReadable = false}) {
    /** @type {[boolean, Function]} Content expansion state */
    const [isExpanded, setIsExpanded] = useState(false)

    /**
     * Toggles content expansion state
     * @function
     */
    const toggleExpand = () => setIsExpanded(!isExpanded)

    /**
     * Formats date for display
     * @function
     * @param {Date|string} date - Date to format
     * @returns {string} Formatted date string
     */
    const formatDate = date => {
        if (date instanceof Date) {
            return date.toLocaleDateString();
        } else if (typeof date === 'string') {
            const parsedDate = new Date(date)
            return isNaN(parsedDate.getTime()) ? 'Invalid date' : parsedDate.toLocaleDateString();
        }
        return 'Date not available'
    }

    /** @type {string} Placeholder text for empty content */
    const fakeText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

    /** @type {string} Content to display */
    const displayContent = note?.content || fakeText

    /** @type {boolean} Whether to show expand button */
    const shouldShowExpandButton = displayContent.length > 140

    return (
        <Card
            className="w-full min-w-[290px] max-w-md bg-gradient-to-br dark:from-secondary dark:to-accent">
            <CardHeader>
                <CardTitle className="text-2xl font-bold ">{note?.title} </CardTitle>
                <CardDescription className="text-sm font-medium">
                    Created: {formatDate(note?.created_at)} <br/>
                    Edited: {formatDate(note?.updated_at)} <br/>
                    Author: {note?.user?.role === "ADMIN" ? ` 🥷🏻 ${note?.user.username}` : note?.user.username} <br/>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-primary-700 dark:text-primary-300 min-h-[3rem]">
                    {!isExpanded ? displayContent.substring(0, 140) + '...' : displayContent}
                </p>
                {shouldShowExpandButton && (
                    <p onClick={toggleExpand}
                       className="text-sm mt-5 font-medium text-primary-600 dark:text-primary-300">
                        {isExpanded ? 'Show less' : 'Show more'}
                        <span className="sr-only">
                            {isExpanded ? 'Show less' : 'Show more'}
                        </span>
                    </p>
                )}
            </CardContent>
            <CardFooter className="flex items-end justify-end gap-2">
                {!justReadable && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(note)}
                            className="bg:bg-secondary hover:bg-secondary-600 dark:bg-secondary-700 dark:hover:bg-secondary-800">
                            <Pencil className="w-4 h-4 mr-2"/>
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(note.id)}
                            className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800">
                            <Trash2 className="w-4 h-4 mr-2"/>
                            Delete
                        </Button>
                    </>)}
            </CardFooter>
        </Card>
    );
}
