import {Dialog, DialogTitle} from "@radix-ui/react-dialog";
import {DialogContent, DialogDescription, DialogFooter, DialogHeader} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormProvider, useForm} from "react-hook-form";
import {useState} from "react";

/**
 * @typedef {Object} SendResetEmailDialogProps
 * @property {Object|null} user - The current user object
 * @property {boolean} open - Dialog open state
 * @property {Function} setOpenResetDialog - Dialog state setter
 * @property {Function} sendEmail - Email sending function
 */

/**
 * Dialog component for password reset functionality
 * @param {SendResetEmailDialogProps} props
 * @returns {JSX.Element}
 */
export default function SendResetEmailDialog({user, open, setOpen, sendEmail}) {
    const [isLoading, setIsLoading] = useState(false);
    const methods = useForm({
        defaultValues: {
            email: user?.email || "",
        },
    });

    const handleSubmit = async (data) => {
        setIsLoading(true)
        await sendEmail(data.email).finally(() => setIsLoading(false));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        {user
                            ? `Will send a password reset link to your email address: ${user.email}`
                            : "Enter your email address to receive a password reset link"
                        }
                    </DialogDescription>
                </DialogHeader>

                {user ? (
                    <DialogFooter className="flex justify-end gap-2 md:flex-row flex-col">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => sendEmail(user.email)} disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </DialogFooter>
                ) : (
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
                            <FormField
                                control={methods.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="evilcorp@example.com"
                                                onChange={(e) => field.onChange(e.target.value)}
                                                value={field.value}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="flex justify-end gap-2 md:flex-row flex-col">
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </FormProvider>
                )}
            </DialogContent>
        </Dialog>
    );
}
