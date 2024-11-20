import {useEffect, useState} from "react";
import AuthService from "@/services/login/login.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {useNavigate, useParams} from "react-router-dom";

export default function ResetPasswordForm({ className }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = useParams()

    const authService = new AuthService();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);

    async function onSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setIsLoading(false);
            return;
        }

        try {
            let token_parsed = token.token.toString().replace('token=', '');
            let resp = await authService.resetGoogleAuthPassword(token_parsed, newPassword);
            if (resp) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <div className={cn("grid gap-6", className)}>
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
                            <div className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Reset Password
                    </Button>
                </div>
            </form>
        </div>
        </>
    );
}
