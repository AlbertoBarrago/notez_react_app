"use client"

import {useState, useEffect} from 'react'
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
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose} aria-labelledby="modal-title">
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Note</DialogTitle>
                    <DialogDescription>
                        Edit notes and save them.
                    </DialogDescription>
                </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="content" className="text-right">
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
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={onClose}>
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