/**
 * @fileoverview Authentication route component handling login and registration
 * @module AuthRoute
 */

'use client'

import Layout from "../components/layout/index.jsx";
import {useState} from "react";
import Auth from "@/services/auth/index.js";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import ErrorsModal from "@/components/dialogs/errors.jsx";

/** @constant {string} */
const SIGN_IN = "signin";
/** @constant {string} */
const SIGN_UP = "signup";

/**
 * Main authentication component handling both sign-in and sign-up functionality
 * @function AuthRoute
 * @returns {JSX.Element} Rendered authentication component
 */
export default function AuthRoute() {
    /**
     * @type {[boolean, Function]} Loading state and setter
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * @type {Auth} Authentication service instance
     */
    const auth = new Auth();

    /**
     * @type {[string, Function]} Active tab state and setter
     */
    const [ tab, setTab] = useState(SIGN_IN);

    /**
     * @type {[boolean, Function]} Error modal visibility state and setter
     */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * @type {[Object, Function]} Error properties state and setter
     */
    const [errorProps, setErrorProps] = useState({});

    /**
     * * @type {import('react-router-dom').NavigateFunction} Navigation function for route transitions
     * */
    const navigate = useNavigate();

    /**
     * @type {Object} Form control for sign-in
     */
    const signinForm = useForm();

    /**
     * @type {Object} Form control for sign-up
     */
    const signupForm = useForm();

    /**
     * Handles sign-in form submission
     * @async
     * @param {Object} data - Form data containing username and password
     * @param {string} data.username - User's username
     * @param {string} data.password - User's password
     */
    const onSubmitSignIn = async (data) => {
        setIsLoading(true);
        try {
            const resp = await auth.login(data.username, data.password);
            if (resp.user) {
                navigate("/note");
            }
        } catch (err) {
            const errorMessage = {
                title: 'Authentication Error',
                status: err.response?.status || 500,
                message: err.response?.data?.detail || 'Login failed. Please try again.'
            };
            setErrorProps(errorMessage);
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles sign-up form submission
     * @async
     * @param {Object} data - Form data containing email, username and password
     * @param {string} data.email - User's email
     * @param {string} data.username - User's username
     * @param {string} data.password - User's password
     */
    const onSubmitSignUp = async (data) => {
        setIsLoading(true);
        try {
            const resp = await auth.register(data.email, data.username, data.password);
            if (resp.user) {
                navigate("/note");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen sm:min-h-auto">
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
                <ErrorsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} errorProps={errorProps} />
            </div>
        </Layout>
    )
}