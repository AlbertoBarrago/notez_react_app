"use client"

import {Button} from "@/components/ui/button.jsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogDescription,
} from "@/components/ui/dialog.jsx"

export default function NoteDeleteModal({isOpen, onClose, onDelete, note}) {


    const handleDelete = () => {
        if (note) {
            onDelete(note.id)
        }
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose} aria-labelledby="modal-title">
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Note</DialogTitle>
                    <DialogDescription>
                        If you proceed the note will be deleted
                    </DialogDescription>
                </DialogHeader>
                <div className="grid">
                    <div className="grid grid-cols-1 items-center">
                        Sei sicuro di voler eliminare questa nota?
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}