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

export default function InterestGroups() {
  return (
    <div className='w-full p-10'>
      <div className='flex flex-row items-center justify-between pl-5 pr-5'>
        <div className='flex flex-row'>
          <ChevronLeft />
          <ChevronRight />
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

      <Link href='/interest-groups/1'>
        <div className='rounded-xl flex items-center justify-start border-2 border-black mt-10'>
          <Avatar className='m-5 h-12 w-12'>
            <AvatarImage src='https://picsum.photos/200' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center justify-start'>
            <div className='text-2xl font-bold'>Group Name</div>
            <div className='text-sm'>199,999,999 Members</div>
          </div>
          <Button
            className='ml-auto mr-5 rounded-xl'
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Join
          </Button>
        </div>
      </Link>

      <div className='rounded-xl flex items-center justify-center border-2 border-black mt-10'>
        <Dialog>
          <DialogTrigger className='rounded-full border-2 border-black flex items-center justify-center m-2 text-xl font-bold pl-5 pr-5 pt-2 pb-2 '>
            +
          </DialogTrigger>
          <DialogContent className='bg-white'>
            <DialogHeader>
              <DialogTitle className='flex flex-row items-center text-sm'>
                <input
                  className='rounded-full border border-black flex items-center justify-center m-2 p-2'
                  type='file'
                />
                Upload Group Image
              </DialogTitle>
              <DialogDescription className='flex flex-col w-full'>
                <input
                  className='border-b w-48 mt-5'
                  type='text'
                  placeholder='Group Name'
                />

                <input
                  className='border-b w-48 mt-5'
                  type='text'
                  placeholder='Group Description'
                />
              </DialogDescription>
            </DialogHeader>
            <Button variant='outline' className='rounded-xl text-right mt-5'>
              Create Group
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
