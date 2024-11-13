"use client"

import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button.jsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog.jsx"

export default function ErrorsModal({isOpen, onClose, errorProps}) {
    const [error, setError] = useState(null)

    useEffect(() => {
        if(errorProps) {
            setError(errorProps.message)
        }
    }, [errorProps])

    return (
        <Dialog open={isOpen} onOpenChange={onClose} aria-labelledby="modal-title">
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Error: {errorProps?.status}</DialogTitle>
                    <DialogDescription>
                        Error while fetching data...
                    </DialogDescription>
                </DialogHeader>
                {error && <div className="text-red-500">
                    🛑 {error}
                </div>}
                <DialogFooter>
                    <Button type="button" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}