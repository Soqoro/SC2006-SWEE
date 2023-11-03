"use client";
import React from "react";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* eslint-disable */
export default function Group() {
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

        <div className='flex flex-row gap-4'>
          <Bell />
          <MessageSquare />
        </div>
      </div>

      <Button className='mt-10 bg-orange-600 rounded-xl text-white'>
        Create Post
      </Button>

      <Link
        href={`/interest-groups/group/discussion`}
        className='flex justify-center'
      >
        <div className='rounded-xl flex items-center justify-between border-2 border-black mt-10 w-3/4'>
          <Avatar className='h-60 w-30'>
            <AvatarImage src='/MUser1.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center justify-start gap-5'>
            <div className='text-2xl font-bold'>Best Book Ever!</div>
            <div className='opacity-50'>Posted by Natalie 7 hours ago</div>
          </div>
          <Image src='/MBook1.png' alt='Book' width='200' height='150' />
        </div>
      </Link>

      <Link
        href={`/interest-groups/group/discussion`}
        className='flex justify-center'
      >
        <div className='rounded-xl flex items-center justify-between border-2 border-black mt-10 w-3/4'>
          <Avatar className='h-60 w-30'>
            <AvatarImage src='/MUser2.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center justify-start gap-5'>
            <div className='text-2xl font-bold'>
              Can&apos;t sleep tonight ....
            </div>
            <div className='opacity-50'>Posted by Danny 8 hours ago</div>
          </div>
          <Image src='/MBook2.png' alt='Book' width='200' height='150' />
        </div>
      </Link>

      <Link
        href={`/interest-groups/group/discussion`}
        className='flex justify-center'
      >
        <div className='rounded-xl flex items-center justify-between border-2 border-black mt-10 w-3/4'>
          <Avatar className='h-60 w-30'>
            <AvatarImage src='/MUser3.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center gap-5'>
            <div className='text-2xl font-bold'>What the f**k</div>
            <div className='opacity-50'>Posted by John 9 hours ago</div>
          </div>
          <Image src='/MBook3.png' alt='Book' width='200' height='150' />
        </div>
      </Link>

      <Link
        href={`/interest-groups/group/discussion`}
        className='flex justify-center'
      >
        <div className='rounded-xl flex items-center justify-between border-2 border-black mt-10 w-3/4'>
          <Avatar className='h-60 w-30'>
            <AvatarImage src='/MUser4.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center justify-start gap-5'>
            <div className='text-2xl font-bold'>
              This thriller is out of the world!
            </div>
            <div className='opacity-50'>Posted by Susan 10 hours ago</div>
          </div>
          <Image src='/MBook4.png' alt='Book' width='200' height='150' />
        </div>
      </Link>

      <div className='flex items-center justify-center mt-16'>
        <button className='px-3 py-1 border rounded-l-md border-gray-300 hover:bg-gray-200 focus:outline-none'>
          <span className='material-icons'>
            <ChevronLeft />
          </span>
        </button>
        <button className='px-3 py-1 bg-blue-500 text-white border-t border-b border-gray-300 hover:bg-blue-600 focus:outline-none'>
          1
        </button>
        <button className='px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-200 focus:outline-none'>
          2
        </button>
        <button className='px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-200 focus:outline-none'>
          3
        </button>
        <div className='px-3 py-1 border-t border-b border-gray-300'>...</div>
        <button className='px-3 py-1 border rounded-r-md border-gray-300 hover:bg-gray-200 focus:outline-none'>
          <span className='material-icons'>
            <ChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
}
