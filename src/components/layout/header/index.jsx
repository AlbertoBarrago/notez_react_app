import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu.jsx";

const publicPath = import.meta.env.VITE_BASE_URL || '/';

export default function Index() {
    return (
        <header className="bg-black p-3 min-h-[10px]">
            <NavigationMenu className="min-w-full">
                <NavigationMenuList className="flex space-x-4">
                    <NavigationMenuItem>
                        <a href={publicPath + "/"} className="text-white p-4">Articles</a>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <a href={publicPath + "/about"} className="text-white p-4">About</a>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <a href={publicPath + "/contact"} className="text-white p-4">Contact</a>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
