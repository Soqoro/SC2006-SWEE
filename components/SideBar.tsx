import Link from "next/link";
import {
    PanelTop,
    Heart,
    SkipForward,
    UserSquare,
    Users,
    Settings,
    LogIn,
} from "lucide-react";

const menuLinks = [
    { href: "/", label: "Browse" },
    { href: "/favourites", label: "Favourites" },
    { href: "/recommender", label: "Recommender" },
];

const socialLinks = [
    { href: "/friends", label: "Friends" },
    { href: "/interest-groups", label: "Interest Groups" },
];

const generalLinks = [{ href: "/settings", label: "Settings" }];

export default function SideBar() {
    return (
        <div className="flex flex-col border-4 h-screen pr-32 pl-8 pt-10">
            <div className="text-xl">
                <strong>CoverQuest.</strong>
            </div>
            <br />
            <br />
            <div className="mb-6">Menu</div>
            {menuLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="flex flex-row mb-4">
                    {href === "/" ? <PanelTop className="pr-1" /> : null}
                    {href === "/favourites" ? <Heart className="pr-1" /> : null}
                    {href === "/recommender" ? (
                        <SkipForward className="pr-1" />
                    ) : null}
                    {label}
                </Link>
            ))}
            <br />
            <br />
            <div className="mb-6">Social</div>
            {socialLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="flex flex-row mb-4">
                    {href === "/friends" ? (
                        <UserSquare className="pr-1" />
                    ) : null}
                    {href === "/interest-groups" ? (
                        <Users className="pr-1" />
                    ) : null}
                    {label}
                </Link>
            ))}
            <br />
            <br />
            <div className="mb-6">General</div>
            {generalLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="flex flex-row mb-4">
                    {href === "/settings" ? (
                        <Settings className="pr-1" />
                    ) : null}
                    {label}
                </Link>
            ))}
            <div className="flex flex-row">
                <LogIn className="pr-1" />
                Login
            </div>
        </div>
    );
}
