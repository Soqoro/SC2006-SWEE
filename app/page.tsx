"use client";
import {
    ChevronLeft,
    ChevronRight,
    X,
    Search,
    ListFilter,
    Bell,
    MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
export default function home() {
    const TrendingBooks = [
        {
            title: "The Great Gatsby",
        },
        {
            title: "Book2",
        },
    ];

    const MysteryBooks = [
        {
            title: "Book1",
        },
        {
            title: "Book2",
        },
    ];

    return (
        <div className="w-full p-10">
            <div className="flex flex-row items-center justify-between pl-5 pr-5">
                <div className="flex flex-row">
                    <ChevronLeft />
                    <ChevronRight />
                </div>

                <div className="flex flex-row items-center">
                    <div className="flex border-2 items-center rounded-xl overflow-hidden">
                        <Search className="ml-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 w-full focus:outline-none"
                        />
                        <X className="mr-2" />
                    </div>
                    <ListFilter className="ml-3" />
                </div>

                <div className="flex flex-row gap-4">
                    <Bell />
                    <MessageSquare />
                </div>
            </div>

            <div className="relative h-64 shadow-lg overflow-hidden mt-5 rounded-xl border-2">
                <Image
                    src="/banner.jpg"
                    alt="Banner Background"
                    width={1920}
                    height={1080}
                    className="absolute h-full w-full object-cover"
                />
                <Image
                    src="/bannerBooks.png"
                    alt="Banner Books"
                    width={400}
                    height={400}
                    className="absolute right-0 top-[-30%]"
                />
                <div className="absolute bottom-0 p-4 w-full">
                    <h1 className="text-white text-2xl font-bold">
                        Exciting Summer Reads Now Available!
                    </h1>
                    <button className="text-white mt-2 underline">
                        View More
                    </button>
                </div>
            </div>

            <div className="text-xl mt-5 mb-5">
                Trending
                <Separator className="border-2" />
            </div>

            <div className="text-xl mt-5 mb-5">Mystery</div>
        </div>
    );
}
