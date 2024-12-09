/**
 * @fileoverview NoteElement card component for displaying individual notes
 * @module Notes
 */

import {useEffect, useRef} from 'react'
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Pencil, Trash2, Globe, Lock} from "lucide-react"
import {cardAnimation} from "@/lib/animation.js"
import {Badge} from "@/components/ui/badge"

/**
 * @typedef {Object} Note
 * @property {string} id - Note identifier
 * @property {string} title - Note title
 * @property {string} content - Note content
 * @property {boolean} is_public - Note visibility status
 * @property {string} image_url - Note image URL
 * @property {string[]} tags - Note tags
 * @property {string|Date} created_at - Creation date
 * @property {string|Date} updated_at - Last update date
 */

export function NotesCard({note, onEdit, onDelete, onClick, justReadable = false}) {
    const displayContent = note?.content || '';
    const cardRef = useRef(null);


    const formatDate = date => {
        if (date instanceof Date) {
            return date.toLocaleDateString();
        } else if (typeof date === 'string') {
            const parsedDate = new Date(date)
            return isNaN(parsedDate.getTime()) ? 'Invalid date' : parsedDate.toLocaleDateString();
        }
        return 'Date not available'
    }

    useEffect(() => {
        cardAnimation(cardRef.current)
    }, [])

    return (
        <div ref={cardRef}>
            <Card
                className="w-full min-w-[290px] max-w-md bg-gradient-to-br dark:from-secondary dark:to-accent
                        hover:shadow-xl transform transition-all duration-300
                        hover:border-primary/50 hover:bg-accent/90 relative"
                title={note.title}>
                <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <CardTitle className="text-2xl font-bold truncate flex-1">
                                {note?.title}
                                <span className='hidden' aria-label='íd'>{note?.id}</span>
                            </CardTitle>
                            <span className="text-sm text-primary-600 dark:text-primary-400 hover:cursor-pointer mt-1"
                                  onClick={onClick}>
                                Click to open note
                            </span>
                        </div>
                        {note?.is_public ?
                            <Globe className="w-5 h-5 text-primary flex-shrink-0"/> :
                            <Lock className="w-5 h-5 text-primary flex-shrink-0"/>
                        }
                    </div>
                    <CardDescription className="text-sm font-medium">
                        Created: {formatDate(note?.created_at)} <br/>
                        Edited: {formatDate(note?.updated_at)} <br/>
                        Author: {note?.user?.role === "ADMIN" ? ` 🥷🏻 ${note?.user.username}` : note?.user.username}
                        <br/>
                    </CardDescription>
                </CardHeader>
                <CardContent className='min-h-[180px]'>
                    {note?.image_url && (
                        <div className="mb-4">
                            <img
                                src={note.image_url}
                                alt="Note image"
                                className="w-full h-48 object-cover rounded-md"
                            />
                        </div>
                    )}
                    <p className="text-sm text-primary-700 dark:text-primary-300 min-h-[2rem]">
                        {displayContent.substring(0, 120) + '...'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {note.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-secondary/10 hover:bg-secondary/20 bg-secondary-600 dark:bg-secondary-400
                         px-3 py-1 rounded-full text-xs font-medium transition-colors
                         border border-primary/20"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>
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
                        </>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
