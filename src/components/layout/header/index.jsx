import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu.jsx";
import {NavLink} from "react-router-dom";


export default function Index() {
    return (
        <header className="p-3 min-h-[10px]">
            <NavigationMenu className="min-w-full flex-row justify-start">
                <NavigationMenuList className="space-x-4">
                    <NavigationMenuItem>
                        <NavLink
                            to="/"
                            className='tiny5-regular text-2xl'
                        >
                            Albz Notes
                        </NavLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <div className="flex-1 justify-end justify-items-end">
                    <NavigationMenuList className="space-x-4">
                        <NavigationMenuItem>
                            <NavLink
                                to="/"
                                className={({isActive, isPending}) =>
                                    isPending ? "pending p-4" : isActive ? "active text-red-500 p-4" : "p-4"
                                }
                            >
                                Articles
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavLink
                                to="/about"
                                className={({isActive, isPending}) =>
                                    isPending ? "pending p-4" : isActive ? "active text-red-500 p-4" : "p-4"
                                }
                            >About
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavLink
                                to="/contact"
                                className={({isActive, isPending}) =>
                                    isPending ? "pending p-4" : isActive ? "active text-red-500 p-4" : "p-4"
                                }
                            >Contact
                            </NavLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
        </header>
    );
}
