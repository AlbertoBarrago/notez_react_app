/**
 * @fileoverview NoteElement card component for displaying individual notes
 * @module Notes
 */

import {useState} from 'react'
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Pencil, Trash2} from "lucide-react"

/**
 * @typedef {Object} Note
 * @property {string} id - NoteElement identifier
 * @property {string} title - NoteElement title
 * @property {string} content - NoteElement content
 * @property {string|Date} created_at - Creation date
 * @property {string|Date} updated_at - Last update date
 */

/**
 * NoteElement card component
 * @function NotesCard
 * @param {Object} props - Component props
 * @param {Note} props.note - NoteElement data
 * @param {Function} props.onEdit - Edit handler callback
 * @param {Function} props.onDelete - Delete handler callback
 * @param {boolean} props.justReadable - Flag to indicate if the note is just readable
 * @returns {JSX.Element} Rendered note card
 */
export function NotesCard({note, onEdit, onDelete, onClick, justReadable = false}) {
    /** @type {[boolean, Function]} Content expansion state */
    const [isExpanded, setIsExpanded] = useState(false)
    const displayContent = note?.content || '';
    const shouldShowExpandButton = displayContent.length > 120;

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


    return (
        <Card
            className="w-full min-w-[290px] max-w-md bg-gradient-to-br dark:from-secondary dark:to-accent">
            <CardHeader
                onClick={onClick}>
                <CardTitle
                    className="text-2xl font-bold">
                    {note?.title} <span className='hidden' aria-label='íd'>{note?.id}</span>
                </CardTitle>
                <CardDescription
                    className="text-sm font-medium"

                >
                    Created: {formatDate(note?.created_at)} <br/>
                    Edited: {formatDate(note?.updated_at)} <br/>
                    Author: {note?.user?.role === "ADMIN" ? ` 🥷🏻 ${note?.user.username}` : note?.user.username} <br/>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-primary-700 dark:text-primary-300 min-h-[2rem]">
                    {!isExpanded && shouldShowExpandButton ? displayContent.substring(0, 120) + '...' : displayContent}
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
            <CardFooter
                className="flex items-end justify-end gap-2">
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
