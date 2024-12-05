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

    return (
        <Dialog open={isOpen} onOpenChange={onClose} aria-labelledby="modal-title">
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Error: {errorProps?.status}</DialogTitle>
                    <DialogDescription>
                        Error while fetching data...
                    </DialogDescription>
                </DialogHeader>
                {errorProps && <div className="text-red-500">
                    🛑 {errorProps.message} <br/>
                    {errorProps?.response?.data?.detail ? `👉🏻 Details: ${errorProps?.response?.data?.detail}` : null}
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