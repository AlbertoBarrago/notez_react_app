import {useEffect, useState} from "react";
import AuthService from "@/services/auth/auth.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "sonner";

export default function ResetPasswordForm({ className }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = searchParams.get('token');

    const authService = new AuthService();

    useEffect(() => {
        if (!token) {
            toast.error("Invalid token");
            navigate('/');
            return;
        }
        toast.success("Token is valid");
    }, [token]);

    async function onSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setIsLoading(false);
            toast.error("Passwords do not match");
            return;
        }

        try {
            let resp = await authService.resetPassword(token, newPassword);
            if (resp) {
                toast.success("Password reset successfully");
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className={cn("grid gap-6", className)}>
                <h1 className={'text-2xl text-center'}>Insert here the new password, after confirm an email with instructions will be sent</h1>

                <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Input
                                id="newPassword"
                                placeholder="New Password"
                                type="password"
                                disabled={isLoading}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Input
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                disabled={isLoading}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <div className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
