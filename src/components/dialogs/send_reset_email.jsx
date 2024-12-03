import {Dialog, DialogTitle} from "@radix-ui/react-dialog";
import {DialogContent, DialogDescription, DialogFooter, DialogHeader} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function SendResetEmailDialog({user, openResetDialog, setOpenResetDialog, sendEmail}) {

    const ResetPasswordDialog = () => (
        <Dialog open={openResetDialog} onOpenChange={setOpenResetDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        Will send a password reset link to your email address: {user?.email}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenResetDialog(false)}>
                        Cancel
                    </Button>
                    <Button onClick={sendEmail}>
                        Send Reset Link
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return (
        <ResetPasswordDialog/>
    )
}