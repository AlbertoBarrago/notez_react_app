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
import {Switch} from "@/components/ui/switch.jsx"

export default function NoteEditModal({isOpen, onClose, onSave, note}) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [tags, setTags] = useState([])

    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content)
            setIsPublic(note.is_public)
            setImageUrl(note.image_url || '')
            setTags(note.tags || [])
        }
    }, [note])

    useEffect(() => {
        if (!isOpen) {
            setTitle('')
            setContent('')
            setIsPublic(false)
            setImageUrl('')
            setTags([])
        }
    }, [isOpen])

    const handleTagsChange = (e) => {
        const tagArray = e.target.value.split(',').map(tag => tag.trim())
        setTags(tagArray)
    }

    const handleSave = () => {
        if (!note || !title.trim() || !content.trim()) return
        onSave({
            ...note,
            title: title.trim(),
            content: content.trim(),
            is_public: isPublic,
            image_url: imageUrl || null,
            tags: tags
        })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose} aria-labelledby="modal-title">
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
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
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="is-public"
                            checked={isPublic}
                            onCheckedChange={setIsPublic}
                        />
                        <Label htmlFor="is-public">Make Public</Label>
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="image-url" className="mb-2">
                            Image URL
                        </Label>
                        <Input
                            id="image-url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="tags" className="mb-2">
                            Tags (comma-separated)
                        </Label>
                        <Input
                            id="tags"
                            value={tags.join(', ')}
                            onChange={handleTagsChange}
                            placeholder="tag1, tag2, tag3"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-end gap-4">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
