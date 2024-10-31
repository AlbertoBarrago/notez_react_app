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
                            className="text-white p-4"
                        >
                            Articles
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/about"
                            className="text-white p-4"
                        >
                            About
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/contact"
                            className="text-white p-4"
                        >
                            Contact
                        </NavLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
