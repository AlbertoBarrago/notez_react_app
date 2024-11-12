import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Auth from "@/services/auth/index.js";
import {useNavigate} from "react-router-dom";

const SIGN_IN = "signin";
const SIGN_UP = "signup";

export function SignInLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const auth = new Auth();
    const [ tab, setTab] = useState(SIGN_IN);
    const navigate = useNavigate();

    const signinForm = useForm();
    const signupForm = useForm();

    const onSubmitSignIn = async (data) => {
        setIsLoading(true);
        try {
            const resp = await auth.login(data.username, data.password);
            navigate(
                "/note",
                { state: { user: resp.user } })
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmitSignUp = async (data) => {
        setIsLoading(true);
        try {
            const resp = await auth.register(data.email, data.username, data.password);
            navigate(
                "/note",
                { state: { user: resp.user } })
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Welcome</CardTitle>
                <CardDescription>Sign in to your account or create a new one.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={SIGN_IN} className="w-full" onValueChange={setTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value={SIGN_IN}>Sign In</TabsTrigger>
                        <TabsTrigger value={SIGN_UP}>Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value={SIGN_IN}>
                        <form onSubmit={signinForm.handleSubmit(onSubmitSignIn)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="usernameSignIn">Username</Label>
                                    <Input id="usernameSignIn" placeholder="johnDoe"
                                           {...signinForm.register("username", { required: true })} />
                                    {signinForm.formState.errors.username && <span>This field is required</span>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="passwordSignIn">Password</Label>
                                    <Input id="passwordSignIn" placeholder="********"
                                           type="password"
                                           {...signinForm.register("password", { required: true })} />
                                    {signinForm.formState.errors.password && <span>This field is required</span>}
                                </div>
                            </div>
                            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value={SIGN_UP}>
                        <form onSubmit={signupForm.handleSubmit(onSubmitSignUp)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="usernameSignUp">Username</Label>
                                    <Input id="usernameSignUp" placeholder="johndoe"
                                           {...signupForm.register("username", { required: true })} />
                                    {signupForm.formState.errors.username && <span>This field is required</span>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="emailSignUp">Email</Label>
                                    <Input id="emailSignUp" type="email" placeholder="m@example.com"
                                           {...signupForm.register("email", { required: true })} />
                                    {signupForm.formState.errors.email && <span>This field is required</span>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="passwordSignUp">Password</Label>
                                    <Input id="passwordSignUp" type="password" placeholder="********"
                                           {...signupForm.register("password", { required: true })} />
                                    {signupForm.formState.errors.password && <span>This field is required</span>}
                                </div>
                            </div>
                            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
