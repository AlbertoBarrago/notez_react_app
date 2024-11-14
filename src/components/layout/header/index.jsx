import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {ThemeSelector} from "@/components/theme/themeSelector.jsx";
import {Button} from "@/components/ui/button.jsx";
import AuthService from "@/services/auth/index.js";


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
                            Notez <span className="text-primary">|</span> {auth.isLoggedIn() ? `Hi, ${auth.getUser().username}`: ``}
                        </NavLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <div className="flex-1 justify-end justify-items-end">
                    <NavigationMenuList className="space-x-4">
                        <NavigationMenuItem>
                            <NavLink
                                to="/note"
                                className={({isActive, isPending}) =>
                                    isPending ? "pending p-4" : isActive ? "active p-4" : "p-4"
                                }
                            >
                                Articles
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavLink
                                to="/about"
                                className={({isActive, isPending}) =>
                                    isPending ? "pending p-4" : isActive ? "active p-4" : "p-4"
                                }
                            >About
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavLink
                                to="/contact"
                                className={({isActive, isPending}) =>
                                    isPending ? "pending p-4" : isActive ? "active p-4" : "p-4"
                                }
                            >Contact
                            </NavLink>
                        </NavigationMenuItem>
                        {auth.isLoggedIn() ?  <NavigationMenuItem>
                            <Button onClick={performLogout}>Logout</Button>
                        </NavigationMenuItem>: null}
                        <ThemeSelector/>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
        </header>
    );
}
