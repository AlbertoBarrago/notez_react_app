"use client"

import {useState} from 'react'
import {Button} from "@/components/ui/button.jsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogDescription,
} from "@/components/ui/dialog.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Label} from "@/components/ui/label.jsx"
import {Textarea} from "@/components/ui/textarea.jsx"

export default function NoteAddNoteModal({isOpen, onClose, onSave}) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleCreationNote = () => {
        onSave({
            title,
            content
        })
        setTitle('')
        setContent('')
        onClose()
    }

    const handleClose = () => {
        setTitle('')
        setContent('')
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose} aria-labelledby="modal-title">
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Note</DialogTitle>
                    <DialogDescription>
                        Edit notes and save them.
                    </DialogDescription>
                </DialogHeader>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <Label htmlFor="title" className="mb-2">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="content" className="mb-2">
                                Content
                            </Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                <DialogFooter className="sm:justify-end gap-4">
                    <Button type="button" variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleCreationNote}>
                        Create Note
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}