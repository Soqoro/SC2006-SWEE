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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* eslint-disable */
export default function Discussion() {
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

      <div className='flex justify-center'>
        <div className='flex rounded-xl justify-between border-2 border-black mt-10 w-3/4 p-5'>
          <div className='flex'>
            <Avatar className='h-20 w-20 mr-5'>
              <AvatarImage src='/MUser1.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col justify-between'>
              <div className='opacity-50 mb-4'>
                Posted by Natalie 7 hours ago
              </div>
              <div>
                <div className='text-2xl font-bold mb-4'>Best Book Ever!</div>
                <p>
                  "The Silent Patient" is a masterful blend of psychological
                  intrigue and gripping suspense. Alex Michaelides weaves a tale
                  that draws you in from the first page and keeps you guessing
                  until the very end. The character development and plot twists
                  make it a standout in the realm of psychological thrillers.
                  It's a haunting and mesmerizing read that lingers in your mind
                  long after you've turned the last page. Highly recommended for
                  anyone who loves a good mystery with depth.
                </p>
              </div>
            </div>
          </div>
          <Image
            src='/MBook1.png'
            alt='Book'
            width='200'
            height='300'
            className='ml-5'
          />
        </div>
      </div>

      <Separator className='border-2 mt-8' />

      <div className='p-4 bg-gray-100 w-full max-w-3xl mx-auto rounded-xl border-2 border-black mt-5'>
        <textarea
          className='w-full h-32 p-3 rounded-t-xl border-b border-gray-200 focus:border-gray-400 resize-none outline-none'
          placeholder='What are your thoughts?'
        ></textarea>
        <div className='flex items-center justify-between rounded-b-xl bg-gray-100 p-2'>
          <div className='flex space-x-4'>
            {/* Replace the placeholders with actual icons */}
            <span className='text-gray-500'>B</span>
            <span className='text-gray-500'>H</span>
            <span className='text-gray-500'>≡</span>
            <span className='text-gray-500'>√</span>
            <span className='text-gray-500'>Σ</span>
            <span className='text-gray-500'>Aa</span>
            <span className='text-gray-500'>===</span>
            <span className='text-gray-500'>==</span>
            <span className='text-gray-500'>T</span>
            <span className='text-gray-500'>U</span>
            <span className='text-gray-500'>✢</span>
          </div>
          <button className='bg-gray-400 text-white py-1 px-4 rounded'>
            Comment
          </button>
        </div>
      </div>

      <div className='w-full max-w-3xl mx-auto mt-5 relative'>
        <div className='absolute top-0 left-6 w-0.5 h-full bg-gray-300 z-0'></div>
        {/* Danny's Comment */}
        <div className='flex mb-4'>
          <div className='flex-shrink-0 z-10 relative'>
            <img
              src='/MUser2.png'
              alt="Danny's Avatar"
              className='w-16 h-16 rounded-full mr-4'
            />
          </div>
          <div className='flex flex-col pl-4 mt-5'>
            <span className='font-semibold'>Danny</span>
            <span className='text-gray-500 text-sm'>- 10 hours ago</span>
            <p className='mt-2'>
              Totally agree! Picked it up on a whim and couldn't put it down.
              One of the best thrillers I've read in a long time.
            </p>
            <div className='flex items-center mt-3 space-x-3'>
              <span className='text-green-500'>↑ 19</span>
              <span className='text-red-500'>↓</span>
              <span className='text-gray-400'>Reply</span>
              <span className='text-gray-400'>...</span>
            </div>
          </div>
        </div>

        {/* Space for staggered effect */}
        <div className='h-8'></div>

        {/* Kelly's Comment */}
        <div className='flex ml-32'>
          <div className='flex-shrink-0 -ml-16 z-10 relative'>
            <div className='absolute top-0 left-6 w-0.5 h-full bg-gray-300 z-0 '></div>
            <img
              src='/MUser4.png'
              alt="Kelly's Avatar"
              className='w-16 h-132 rounded-full mr-4 z-10 relative'
            />
          </div>
          <div className='flex flex-col pl-4 mt-5'>
            <span className='font-semibold'>Kelly</span>
            <span className='text-gray-500 text-sm'>- 11 hours ago</span>
            <p className='mt-2'>
              Stop the cap, i bet you didn't like the book.
            </p>
            <div className='flex items-center mt-3 space-x-3'>
              <span className='text-green-500'>↑</span>
              <span className='text-red-500'>↓ -5</span>
              <span className='text-gray-400'>Reply</span>
              <span className='text-gray-400'>...</span>
            </div>
          </div>
        </div>
        <div className='w-full max-w-3xl mx-auto mt-5 relative'>
          {/* John's Comment */}

          {/* Vertical line */}
          <div className='absolute top-0 left-6 w-0.5 h-full bg-gray-300 z-0'></div>

          {/* John's Comment */}
          <div className='flex mb-4'>
            <div className='flex-shrink-0 z-10 relative'>
              <img
                src='/MUser3.png'
                alt="John's Avatar"
                className='w-16 h-16 rounded-full mr-4'
              />
            </div>
            <div className='flex flex-col pl-4 mt-5'>
              <span className='font-semibold'>John</span>
              <span className='text-gray-500 text-sm'>- 12 hours ago</span>
              <p className='mt-2'>
                I had the ending spoiled for me, and I STILL enjoyed every page.
                That says a lot about the quality of the writing. The character
                depth in 'The Silent Patient' really sets it apart. Michaelides'
                understanding of human psychology is commendable. Anyone have
                similar book recommendations? Need my next fix!
              </p>
              <div className='flex items-center mt-3 space-x-3'>
                <span className='text-green-500'>↑ 10</span>
                <span className='text-red-500'>↓</span>
                <span className='text-gray-400'>Reply</span>
                <span className='text-gray-400'>...</span>
              </div>
            </div>
          </div>
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
