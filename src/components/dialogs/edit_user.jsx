import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent, DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function EditProfileDialog({user, openEditProfileDialog, setOpenEditProfileDialog}) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user ? user.username : "",
        email: user ? user.email : "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log("Profile updated:", formData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        setOpenEditProfileDialog(false);
    }
    return (
        <Dialog open={openEditProfileDialog}
                onOpenChange={setOpenEditProfileDialog}
                onEscapeKeyDown={() => setOpenEditProfileDialog(false)}>
            <DialogContent className="sm:max-w-[auto]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your account detail</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-1 gap-2">
                        <Input
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({...formData, name: e.target.value})
                            }
                            disabled={isLoading}
                        />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({...formData, email: e.target.value})
                            }
                            disabled={isLoading}
                        />
                    </div>
                    <DialogFooter className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenEditProfileDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <div className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
