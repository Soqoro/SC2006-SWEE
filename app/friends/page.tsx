"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  ListFilter,
  Bell,
  MessageSquare,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const friendList = [
  {
    id: "1",
    icon: "/MUser2.png",
    name: "Danny",
    LastAdded: "8 Nov 2023",
  },
  {
    id: "2",
    icon: "/MUser4.png",
    name: "Kelly",
    LastAdded: "8 Nov 2023",
  },
];

/* eslint-disable */
export default function friends() {
  const { data: session } = useSession();
  const handleFrontNavigation = (e: any) => {
    e.preventDefault();
    window.history.forward();
  };

  const handleBackNavigation = (e: any) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className='w-full p-10'>
      <div className='flex flex-row items-center justify-between pl-5 pr-5'>
        <div className='flex flex-row'>
          <a href='#' onClick={handleBackNavigation}>
            <ChevronLeft />
          </a>
          <a href='#' onClick={handleFrontNavigation}>
            <ChevronRight />
          </a>
        </div>

        <div className='flex flex-row items-center'>
          <div className='flex border-2 items-center rounded-xl overflow-hidden'>
            <Search className='ml-2' />
            <input
              type='text'
              placeholder='Search...'
              className='px-4 py-2 w-full focus:outline-none'
            />
            <X className='mr-2' />
          </div>
          <ListFilter className='ml-3' />
        </div>

        <div className='flex flex-row gap-4 items-center'>
          {session && (
            <Avatar>
              <AvatarImage src={session.user.image ?? undefined} alt='QR' />
              <AvatarFallback>QR</AvatarFallback>
            </Avatar>
          )}
          <Bell />
          <MessageSquare />
        </div>
      </div>

      <Table className='mt-5'>
        <TableCaption>
          <div className='flex items-center justify-center mt-16'>
            <button className='px-3 py-1 border rounded-l-md border-gray-300 hover:bg-gray-200 focus:outline-none'>
              <span className='material-icons'>
                <ChevronLeft />
              </span>
            </button>
            <button className='px-3 py-1 bg-blue-500 text-white border-t border-b border-gray-300 hover:bg-blue-600 focus:outline-none'>
              1
            </button>
            <button className='px-3 py-1 border rounded-r-md border-gray-300 hover:bg-gray-200 focus:outline-none'>
              <span className='material-icons'>
                <ChevronRight />
              </span>
            </button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last Added</TableHead>
            <TableHead className='text-right'>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {friendList.map((friend) => (
            <TableRow key={friend.id}>
              <TableCell className='font-medium'>
                <img
                  src={friend.icon}
                  alt='Avatar'
                  className='w-24 h-18 rounded-full'
                />
              </TableCell>
              <TableCell>{friend.name}</TableCell>
              <TableCell>{friend.LastAdded}</TableCell>
              <TableCell className='text-right'>
                <Button variant='outline' className='rounded-xl'>
                  Contact Me
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
