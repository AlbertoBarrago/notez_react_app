import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu.jsx";
import {NavLink} from "react-router-dom";


export default function Index() {
    return (
        <header className="bg-black p-3 min-h-[10px]">
            <NavigationMenu className="min-w-full">
                <NavigationMenuList className="flex space-x-4">
                    <NavigationMenuItem>
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active text-red-500" : "text-white"
                            }
                        >
                            Articles
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/about"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active text-red-500" : "text-white"
                            }
                        >
                            About
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/contact"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active text-red-500" : "text-white"
                            }
                        >
                            Contact
                        </NavLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
