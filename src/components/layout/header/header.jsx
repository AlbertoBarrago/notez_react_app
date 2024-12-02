import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {ThemeSelector} from "@/components/theme/themeSelector.jsx";
import {Button} from "@/components/ui/button.jsx";
import AuthService from "@/services/auth/auth.js";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Menu} from "lucide-react";
import {Dialog, DialogTitle} from "@radix-ui/react-dialog";
import {DialogContent, DialogDescription, DialogFooter, DialogHeader} from "@/components/ui/dialog.jsx";
import {useState} from "react";

const auth = new AuthService()
/**
 * Main header component that handles navigation and user interface elements
 * Features:
 * - Responsive navigation menu with mobile/desktop layouts
 * - User authentication status display
 * - Theme selection
 * - Avatar display for logged-in users
 * - Logout functionality
 *
 * @component
 * @returns {JSX.Element} Header component with navigation menu, user info, and theme controls
 */
export default function Header() {
    const [openResetDialog, setOpenResetDialog] = useState(false)
    const auth = new AuthService()
    const navigate = useNavigate()
    const user = auth.getUser();

    const performLogout = () => {
        auth.logout()
        navigate("/", {replace: true})
    }

    const sendEmail = () => {
        auth.sendResetEmail(user?.username)
    }

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

    const UserDropdownMenu = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={user?.picture_url}
                            alt={user?.username || 'User avatar'}
                            referrerPolicy="no-referrer"
                        />
                        <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    <span>{user?.username}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenResetDialog(true);
                }}>
                    Reset Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={performLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const MobileNavigationItems = () => (
        <div className="flex flex-col w-full gap-2">
            <NavLink
                to="/notes"
                className={({isActive, isPending}) =>
                    `w-full p-3 mb-3 text-center ${isPending ? "pending" : isActive ? "active rounded" : ""}`
                }
            >
                Your Articles
            </NavLink>
            <NavLink
                to="/explore"
                className={({isActive, isPending}) =>
                    `w-full p-3 mb-3 text-center ${isPending ? "pending" : isActive ? "active rounded" : ""}`
                }
            >
                Explore
            </NavLink>
            {auth.isLoggedIn() && (
                <Button className="w-full" onClick={performLogout}>
                    Logout
                </Button>
            )}
        </div>
    )

    const DesktopNavigationItems = () => (
        <>
            <NavigationMenuItem>
                <NavLink
                    to="/notes"
                    className={({isActive, isPending}) =>
                        isPending ? "pending p-3" : isActive ? "active p-3 rounded" : "p-3"
                    }
                >
                    Your Articles
                </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavLink
                    to="/explore"
                    className={({isActive, isPending}) =>
                        isPending ? "pending p-3" : isActive ? "active p-3 rounded" : "p-3"
                    }
                >
                    Explore
                </NavLink>
            </NavigationMenuItem>
            {auth.isLoggedIn() && (
                <NavigationMenuItem>
                    <Button onClick={performLogout}>Logout</Button>
                </NavigationMenuItem>
            )}
        </>
    )

    return (
        <>
            <header className="p-3 min-h-[10px]">
                <NavigationMenu className="min-w-full flex justify-between items-center">
                    <NavigationMenuList className="ml-3">
                        <NavigationMenuItem>
                            <NavLink to="/notes" className='text-2xl no-bg'>
                                {auth.isLoggedIn() && <UserDropdownMenu/>}
                            </NavLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                    <div className="hidden md:flex items-center gap-4">
                        <NavigationMenuList className="space-x-4">
                            <DesktopNavigationItems/>
                            <ThemeSelector/>
                        </NavigationMenuList>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <ThemeSelector/>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <div className="flex flex-col mt-10">
                                    <MobileNavigationItems/>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </NavigationMenu>
            </header>
            <ResetPasswordDialog/>
        </>
    );
}