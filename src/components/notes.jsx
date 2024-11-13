import {useState} from 'react'
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Pencil, Trash2} from "lucide-react"


export function Notes({note, onEdit, onDelete}) {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => setIsExpanded(!isExpanded)

    const formatDate = date => {
        if (date instanceof Date) {
            return date.toLocaleDateString();
        } else if (typeof date === 'string') {
            const parsedDate = new Date(date)
            return isNaN(parsedDate.getTime()) ? 'Invalid date' : parsedDate.toLocaleDateString();
        }
        return 'Date not available'
    }
    const fakeText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    const displayContent = note?.content || fakeText
    const shouldShowExpandButton = displayContent.length > 140

    return (
        <Card
            className="w-full max-w-md bg-gradient-to-br dark:from-primary dark:to-secondary">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary-800 dark:text-primary-100">{note?.title} </CardTitle>
                <CardDescription className="text-sm font-medium text-primary-600 dark:text-primary-300">
                    Created: {formatDate(note?.created_at)} - Edited: {formatDate(note?.updated_at)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-primary-700 dark:text-primary-300">
                    {!isExpanded ? displayContent.substring(0, 140) + '...' : displayContent}
                </p>
                {shouldShowExpandButton && (
                    <p onClick={toggleExpand} className="text-sm mt-5 font-medium text-primary-600 dark:text-primary-300">
                        {isExpanded ? 'Show less' : 'Show more'}
                        <span className="sr-only">
                            {isExpanded ? 'Show less' : 'Show more'}
                        </span>
                    </p>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(note.id)}
                    className="text-primary-700 border-primary-300 hover:bg-primary-200 dark:text-primary-200 dark:border-primary-600 dark:hover:bg-primary-700">
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
            </CardFooter>
        </Card>
    );
}