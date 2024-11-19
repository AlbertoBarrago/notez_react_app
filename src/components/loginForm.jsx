import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import Layout from "@/components/layout/index.jsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import ErrorsModal from "@/components/dialogs/errors.jsx";
import { EyeIcon, EyeOffIcon } from "lucide-react"
import {useState} from "react";


/** @constant {string} */
const SIGN_IN = "signing";
/** @constant {string} */
const SIGN_UP = "signup";
/** @constant {string} */
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


export function LoginForm({
                                  signingForm,
                                  onSubmitSignIn,
                                  onSubmitSignUp,
                                  setIsModalOpen,
                                  setTab,
                                  isLoading,
                                  signupForm,
                                  googleOAuth,
                                  isModalOpen,
                                  errorProps
                              }) {

    const [showPassword, setShowPassword] = useState(false)

    return (

        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <Layout>
                <div className="flex justify-center items-center min-h-[85vh] sm:min-h-auto px-4 py-6">
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>📒 Notez App</CardTitle>
                            <CardDescription>Sign in to your account or create a new one.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue={SIGN_IN} className="w-full mb-5" onValueChange={setTab}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value={SIGN_IN}>Sign In</TabsTrigger>
                                    <TabsTrigger value={SIGN_UP}>Sign Up</TabsTrigger>
                                </TabsList>
                                <TabsContent value={SIGN_IN}>
                                    <form className="mt-6" onSubmit={signingForm.handleSubmit(onSubmitSignIn)}>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="usernameSignIn">Username</Label>
                                                <Input id="usernameSignIn" placeholder="johnDoe"
                                                       {...signingForm.register("username", {required: true})} />
                                                {signingForm.formState.errors.username &&
                                                    <span>This field is required</span>}
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="passwordSignIn">Password</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="passwordSignIn"
                                                        placeholder="********"
                                                        type={showPassword ? "text" : "password"}
                                                        {...signingForm.register("password", {required: true})}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOffIcon className="h-4 w-4"/>
                                                        ) : (
                                                            <EyeIcon className="h-4 w-4"/>
                                                        )}
                                                    </Button>
                                                </div>
                                                {signingForm.formState.errors.password &&
                                                    <span>This field is required</span>}
                                            </div>
                                        </div>
                                        <Button className="w-full mt-8 mb-4" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Signing In...' : 'Sign In'}
                                        </Button>
                                        <GoogleLogin
                                            text="signin"
                                            type="standard"
                                            theme="filled_black"
                                            size="large"
                                            onSuccess={credentialResponse => {
                                                googleOAuth(credentialResponse);
                                            }}
                                            onError={() => {
                                                console.log('LoginForm Failed');
                                            }}
                                        />
                                    </form>
                                </TabsContent>
                                <TabsContent value={SIGN_UP}>
                                    <form className="mt-6" onSubmit={signupForm.handleSubmit(onSubmitSignUp)}>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="usernameSignUp">Username</Label>
                                                <Input id="usernameSignUp" placeholder="johndoe"
                                                       {...signupForm.register("username", {required: true})} />
                                                {signupForm.formState.errors.username &&
                                                    <span>This field is required</span>}
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="emailSignUp">Email</Label>
                                                <Input
                                                    id="emailSignUp"
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    {...signupForm.register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                />
                                                {signupForm.formState.errors.email && (
                                                    <span className="text-sm text-red-500">
                                                        {signupForm.formState.errors.email.message}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="passwordSignUp">Password</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="passwordSignUp"
                                                        placeholder="********"
                                                        type={showPassword ? "text" : "password"}
                                                        {...signupForm.register("password", {required: true})}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOffIcon className="h-4 w-4"/>
                                                        ) : (
                                                            <EyeIcon className="h-4 w-4"/>
                                                        )}
                                                    </Button>
                                                </div>
                                                {signupForm.formState.errors.password &&
                                                    <span>This field is required</span>}
                                            </div>
                                        </div>
                                        <Button className="w-full mt-8 mb-4" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                                        </Button>
                                        <GoogleLogin
                                            text="signup_with"
                                            type="standard"
                                            theme="filled_black"
                                            size="large"
                                            onSuccess={credentialResponse => {
                                                googleOAuth(credentialResponse, false);
                                            }}
                                            onError={() => {
                                                console.log('LoginForm Failed');
                                            }}
                                        />
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                    <ErrorsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} errorProps={errorProps}/>
                </div>
            </Layout>
        </GoogleOAuthProvider>
    )
}