"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  ListFilter,
  Bell,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import * as DialogPrimitive from "@radix-ui/react-dialog";

/* eslint-disable */
export default function InterestGroups() {
  const [joined1, setJoined1] = useState(false);
  const [joined2, setJoined2] = useState(false);
  const [joined3, setJoined3] = useState(false);
  const [joined4, setJoined4] = useState(true);
  const { data: session } = useSession();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [groupTitle, setGroupTitle] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast({
      title: "Suceessfully added post!",
    });
  };
  const handleTitleChange = (e: any) => {
    setGroupTitle(e.target.value);
  };
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

      {isSubmitted && (
        <Link href={`/interest-groups/group`} className='flex justify-center'>
          <div className='rounded-xl flex items-center justify-start border-2 border-black mt-10 w-3/4'>
            <Avatar className='h-40 w-40 mr-10'>
              <AvatarImage src='/DemoGroupMangaHomies.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col justify-start'>
              <div className='text-2xl font-bold'>{groupTitle}</div>
              <div className='text-sm'>1 Member</div>
            </div>
            <Button
              className={`ml-auto mr-5 rounded-xl ${
                joined4 ? "bg-gray-200 text-black" : "bg-black text-white"
              }`}
              variant='outline'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setJoined4(!joined4);
              }}
            >
              {joined4 ? "Joined" : "Join"}
            </Button>
          </div>
        </Link>
      )}

      <Link href={`/interest-groups/group`} className='flex justify-center'>
        <div className='rounded-xl flex items-center justify-start border-2 border-black mt-10 w-3/4'>
          <Avatar className='h-40 w-40 mr-10'>
            <AvatarImage src='/HorrorFanatics.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-start'>
            <div className='text-2xl font-bold'>Horror Fanatics</div>
            <div className='text-sm'>2,789,000 Members</div>
          </div>
          <Button
            className={`ml-auto mr-5 rounded-xl ${
              joined1 ? "bg-gray-200 text-black" : "bg-black text-white"
            }`}
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setJoined1(!joined1);
            }}
          >
            {joined1 ? "Joined" : "Join"}
          </Button>
        </div>
      </Link>

      <Link href={`/interest-groups/group`} className='flex justify-center'>
        <div className='rounded-xl flex items-center justify-start border-2 border-black mt-10 w-3/4'>
          <Avatar className='h-40 w-40 mr-10'>
            <AvatarImage src='/RomanceLovers.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-start'>
            <div className='text-2xl font-bold'>Romance Lovers</div>
            <div className='text-sm'>2,789,000 Members</div>
          </div>
          <Button
            className={`ml-auto mr-5 rounded-xl ${
              joined2 ? "bg-gray200 text-black" : "bg-black text-white"
            }`}
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setJoined2(!joined2);
            }}
          >
            {joined2 ? "Joined" : "Join"}
          </Button>
        </div>
      </Link>

      <Link href={`/interest-groups/group`} className='flex justify-center'>
        <div className='rounded-xl flex items-center justify-start border-2 border-black mt-10 w-3/4'>
          <Avatar className='h-40 w-40 mr-10'>
            <AvatarImage src='/ThrillingThrillers.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-start'>
            <div className='text-2xl font-bold'>Thrilling Thriller</div>
            <div className='text-sm'>2,789,000 Members</div>
          </div>
          <Button
            className={`ml-auto mr-5 rounded-xl ${
              joined3 ? "bg-gray-200 text-black" : "bg-black text-white"
            }`}
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setJoined3(!joined3);
            }}
          >
            {joined3 ? "Joined" : "Join"}
          </Button>
        </div>
      </Link>

      <div className='flex justify-center'>
        <div className='rounded-xl flex items-center justify-center border-2 border-black mt-10 w-3/4 p-2'>
          <Dialog>
            <DialogTrigger className='rounded-full border-2 border-black flex items-center justify-center m-2 text-xl font-bold pl-5 pr-5 pt-2 pb-2 '>
              +
            </DialogTrigger>
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogTitle className='flex flex-row items-center text-sm'>
                  Upload Group Image:
                  <input
                    className='flex items-center justify-center m-2 p-2'
                    type='file'
                  />
                </DialogTitle>
                <DialogDescription className='flex flex-col w-full'>
                  <input
                    className='border-b w-48 mt-5'
                    type='text'
                    placeholder='Group Name'
                    onChange={handleTitleChange}
                  />

                  <input
                    className='border-b w-48 mt-5'
                    type='text'
                    placeholder='Group Description'
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogPrimitive.Close>
                <Button
                  variant='outline'
                  className='rounded-xl text-right mt-5'
                  onClick={handleSubmit}
                >
                  Create Group
                </Button>
              </DialogPrimitive.Close>
            </DialogContent>
          </Dialog>
        </div>
      </div>
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
