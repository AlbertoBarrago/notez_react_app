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
    SheetContent, SheetHeader, SheetTitle,
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
import {useState} from "react";
import SendResetEmailDialog from "@/components/dialogs/send_reset_email.jsx";
import EditProfileDialog from "@/components/dialogs/edit_user.jsx";
import DeleteAccountDialog from "@/components/dialogs/delete_account.jsx";

const BOSS_NAME = {
    name: 'Alberto Barrago',
    nickname: 'alBz'
};
/**
 * Main header part that handles navigation and user interface elements
 * Features:
 * - Responsive navigation menu with mobile/desktop layouts
 * - User authentication status display
 * - User avatar display for logged-in users
 * - Theme selection
 * - Avatar display for logged-in users
 * - Logout functionality
 *
 * @component
 * @returns {JSX.Element} Header component with navigation menu, user info, and theme controls
 */
export default function Header() {
    const [openResetDialog, setOpenResetDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false)
    const auth = new AuthService()
    const navigate = useNavigate()
    const user = auth.getUser();

    const performLogout = () => {
        auth.logout()
        navigate("/", {replace: true})
    }

    const sendEmail = () => {
        auth.sendResetEmail(user?.username).then(() =>
            setOpenResetDialog(false)
        )
    }

    const deleteAccount = () => {
        auth.deleteUser(user?.user_id).then(() => {
            performLogout()
        })
    }

    const handleDropDownClick = (e, operation) => {
        e.preventDefault();
        e.stopPropagation();
        switch (operation) {
            case 'reset-password':
                setOpenResetDialog(true)
                break;
            case 'edit-profile':
                setOpenEditDialog(true)
                break;
            case 'delete-account':
                setOpenDeleteAccountDialog(true)
                break;
            case 'logout':
                performLogout()
                break;
            default:
                break;
        }
    }

    const UserDropdownMenu = () => (
        <DropdownMenu className="hover:cursor-pointer">
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage
                            src={user?.picture_url}
                            alt={user?.username || 'User avatar'}
                            referrerPolicy="no-referrer"
                        />
                        <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    <span
                        className='text-[1.2rem]'>{user?.username === BOSS_NAME.name ? BOSS_NAME.nickname : user?.username}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={(e) => handleDropDownClick(e, 'edit-profile')}>
                    Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={(e) => handleDropDownClick(e, 'reset-password')}>
                    Reset Password
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer bg-red-500" onClick={(e) => handleDropDownClick(e, 'delete-account')}>
                    Delete Account
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={(e) => handleDropDownClick(e, 'logout')}>
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
                    `w-full p-3 mb-3 text-center ${isPending ? "pending" : isActive ? "bg-primary rounded" : "bg-secondary rounded"}`
                }
            >
                Your Articles
            </NavLink>
            <NavLink
                to="/explore"
                className={({isActive, isPending}) =>
                    `w-full p-3 mb-3 text-center ${isPending ? "pending" : isActive ? "bg-primary rounded" : "bg-secondary rounded"}`
                }
            >
                Explore
            </NavLink>
        </div>
    )

    const DesktopNavigationItems = () => (
        <>
            <NavigationMenuItem>
                <NavLink
                    to="/notes"
                    className={({isActive, isPending}) =>
                        isPending ? "pending p-3" : isActive ? "bg-primary p-3 rounded" : "p-3 bg-secondary rounded"
                    }
                >
                    Your Articles
                </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavLink
                    to="/explore"
                    className={({isActive, isPending}) =>
                        isPending ? "pending p-3" : isActive ? "bg-primary p-3 rounded" : "p-3 bg-secondary rounded"
                    }
                >
                    Explore
                </NavLink>
            </NavigationMenuItem>
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
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col mt-10">
                                    <MobileNavigationItems/>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </NavigationMenu>
            </header>
            <SendResetEmailDialog open={openResetDialog}
                                  setOpen={setOpenResetDialog}
                                  sendEmail={sendEmail}
                                  user={user}/>

            <EditProfileDialog user={user}
                               open={openEditDialog}
                               setOpen={setOpenEditDialog}/>

            <DeleteAccountDialog open={openDeleteAccountDialog}
                                 setOpen={setOpenDeleteAccountDialog}
                                 deleteAction={deleteAccount}/>
        </>
    );
}