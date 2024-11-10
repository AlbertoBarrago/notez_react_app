import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";

export function SignInLogin() {
    const [isLoading, setIsLoading] = useState(false);
    function handleSubmit() {

    }
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Welcome</CardTitle>
                <CardDescription>Sign in to your account or create a new one.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="signin-email">Email</Label>
                                    <Input id="signin-email" type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="signin-password">Password</Label>
                                    <Input id="signin-password" type="password" required />
                                </div>
                            </div>
                            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="signup">
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="signup-username">Username</Label>
                                    <Input id="signup-username" placeholder="johndoe" required />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input id="signup-email" type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input id="signup-password" type="password" required />
                                </div>
                            </div>
                            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">Welcome to 📒 Notez</p>
            </CardFooter>
        </Card>
    )
}