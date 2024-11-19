import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {ThemeSelector} from "@/components/theme/themeSelector.jsx";
import {Button} from "@/components/ui/button.jsx";
import AuthService from "@/services/login/index.js";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";


export default function Index() {
    const auth = new AuthService()
    const navigate = useNavigate()

    const performLogout = () => {
        auth.logout()
        navigate(
            "/",
            {
                replace: true,
            })
    }
    return (
        <header className="p-3 min-h-[10px]">
            <NavigationMenu className="min-w-full flex-row justify-start">
                <NavigationMenuList className="ml-3">
                    <NavigationMenuItem>
                        <NavLink
                            to="/note"
                            className='text-2xl no-bg'
                        >
                            {auth.isLoggedIn() && (
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={auth.getUser().picture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>{auth.getUser().username}</span>
                                </div>
                            )}

                        </NavLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <div className="flex-1 justify-end justify-items-end">
                    <NavigationMenuList className="space-x-4">
                        <NavigationMenuItem>
                            <NavLink
                                to="/note"
                                className={({isActive, isPending}) =>
                                    isPending ? "pending p-3" : isActive ? "active p-3 rounded" : "p-3"
                                }
                            >
                                Your Articles
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavLink
                                to="/about"
                                className={({isActive, isPending}) =>
                                    isPending ? "pending p-3" : isActive ? "active p-3 rounded" : "p-3"
                                }
                            >Explore
                            </NavLink>
                        </NavigationMenuItem>
                        {auth.isLoggedIn() ? <NavigationMenuItem>
                            <Button onClick={performLogout}>Logout</Button>
                        </NavigationMenuItem> : null}
                        <ThemeSelector/>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
        </header>
    );
}
