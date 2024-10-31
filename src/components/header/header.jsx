import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Header() {
    return (
        <NavigationMenu className="min-w-full pt-2">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <a href="/articles" className="p-4 ">Articles</a>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <a href="/about" className="p-4 ">About</a>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <a href="/contact" className="p-4 ">Contact</a>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
