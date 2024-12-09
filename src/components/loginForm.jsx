import {GoogleOAuthProvider} from "@react-oauth/google";
import Layout from "@/components/layout/layout.jsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Button} from "@/components/ui/button.jsx";
import {EyeIcon, EyeOffIcon} from "lucide-react"
import {useState} from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import SendResetEmailDialog from "@/components/dialogs/send_reset_email.jsx";
import AuthService from "@/services/auth/auth.js";
import CustomGoogleLoginButton from "@/components/googleButton.jsx";

const SIGN_IN = "signing";
const SIGN_UP = "signup";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Login form component
 * @typedef {Object} LoginFormProps
 * @param signingForm
 * @param signupForm
 * @param onSubmitSignIn
 * @param onSubmitSignUp
 * @param googleOAuth
 * @param setTab
 * @param isLoading
 * @returns {JSX.Element}
 * @constructor
 */
export function LoginForm({
                              signingForm,
                              signupForm,
                              onSubmitSignIn,
                              onSubmitSignUp,
                              googleOAuth,
                              setTab,
                              isLoading,
                          }) {
    const auth = new AuthService();
    const [showPassword, setShowPassword] = useState(false)
    const [openResetDialog, setOpenResetDialog] = useState(false)
    const user = auth.getUser();

    const sendEmail = (data) => {
        auth.sendResetEmailFromEmail(data).then(() =>
            setOpenResetDialog(false)
        )
    }

    return (
        <>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <Layout>
                    <div className="flex justify-center items-center min-h-[85vh] sm:min-h-auto px-4 py-12">
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>📒 Notez App</CardTitle>
                                <CardDescription>
                                    Sign in to your account or create a new one.
                                    <p className="text-xs mt-2">* Indicates required field</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue={SIGN_IN} className="w-full mb-5" onValueChange={setTab}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value={SIGN_IN}>Sign In</TabsTrigger>
                                        <TabsTrigger value={SIGN_UP}>Sign Up</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value={SIGN_IN}>
                                        <Form {...signingForm}>
                                            <form className="mt-6" onSubmit={signingForm.handleSubmit(onSubmitSignIn)}>
                                                <FormField
                                                    control={signingForm.control}
                                                    name="username"
                                                    rules={{
                                                        validate: (value) => {
                                                            if (value.includes('@')) {
                                                                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                                                                return emailRegex.test(value) || "Please enter a valid email address";
                                                            }
                                                            const usernameRegex = /^[a-zA-Z0-9\s]{3,30}$/;
                                                            return usernameRegex.test(value) || "Username must be 3-20 characters and can contain letters, numbers, and underscores";
                                                        }
                                                    }}
                                                    render={({field}) => (
                                                        <FormItem className="mt-4">
                                                            <FormLabel>Email/Username*</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="johnDoe@evilcorp.com | Jhon Doe" {...field} />
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                Enter your email address.
                                                            </FormDescription>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={signingForm.control}
                                                    name="password"
                                                    render={({field}) => (
                                                        <FormItem className="mt-4">
                                                            <FormLabel>Password*</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        type={showPassword ? "text" : "password"}
                                                                        placeholder="********"
                                                                        {...field}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                                                                        onClick={() => {
                                                                            setShowPassword(!showPassword)
                                                                        }}
                                                                    >
                                                                        {showPassword ? (
                                                                            <EyeOffIcon className="h-4 w-4"/>
                                                                        ) : (
                                                                            <EyeIcon className="h-4 w-4"/>
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                Enter your password.
                                                            </FormDescription>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex justify-end mt-2">
                                                    <Button
                                                        variant="link"
                                                        className="text-sm text-muted-foreground hover:text-primary p-0"
                                                        onClick={() => {
                                                            setOpenResetDialog(true)
                                                        }}
                                                    >
                                                        Forgot Password?
                                                    </Button>
                                                </div>
                                                <Button className="w-full mt-8 mb-4" type="submit" disabled={isLoading}>
                                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                                </Button>
                                                <CustomGoogleLoginButton
                                                    operation={googleOAuth}
                                                    isLogin={true}
                                                />
                                            </form>
                                        </Form>
                                    </TabsContent>
                                    <TabsContent value={SIGN_UP}>
                                        <Form {...signupForm}>
                                            <form className="mt-6" onSubmit={signupForm.handleSubmit(onSubmitSignUp)}>
                                                <FormField
                                                    control={signupForm.control}
                                                    name="username"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Username</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="johndoe" {...field} />
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                Enter your username.
                                                            </FormDescription>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={signupForm.control}
                                                    name="email"
                                                    rules={{
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Please enter a valid email address"
                                                        }
                                                    }}
                                                    render={({field}) => (
                                                        <FormItem className="mt-4">
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="m@example.com" {...field} />
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                Enter your email address.
                                                            </FormDescription>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={signupForm.control}
                                                    name="password"
                                                    render={({field}) => (
                                                        <FormItem className="mt-4">
                                                            <FormLabel>Password</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        type={showPassword ? "text" : "password"}
                                                                        placeholder="********"
                                                                        {...field}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                                                                        onClick={() => {
                                                                            setShowPassword(!showPassword)
                                                                        }}
                                                                    >
                                                                        {showPassword ? (
                                                                            <EyeOffIcon className="h-4 w-4"/>
                                                                        ) : (
                                                                            <EyeIcon className="h-4 w-4"/>
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                Enter your password
                                                            </FormDescription>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button className="w-full mt-8 mb-4" type="submit" disabled={isLoading}>
                                                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                                                </Button>
                                                <CustomGoogleLoginButton
                                                    operation={googleOAuth}
                                                />
                                            </form>
                                        </Form>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                </Layout>
            </GoogleOAuthProvider>
            <SendResetEmailDialog setOpenResetDialog={setOpenResetDialog}
                                  openResetDialog={openResetDialog}
                                  user={user}
                                  sendEmail={(email) => sendEmail(email)}/>
        </>
    )
}