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
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const romanceBooks = [
  {
    title: "King of Greed",
    cover: "https://m.media-amazon.com/images/I/916aHcKUtgL._SL1500_.jpg",
  },
  {
    title: "Caught Up",
    cover: "https://m.media-amazon.com/images/I/91dbecj7GdL._SL1500_.jpg",
  },
  {
    title: "Hopeless",
    cover: "https://m.media-amazon.com/images/I/91PVmik98-L._SL1500_.jpg",
  },
  {
    title: "Tempted By The Devil",
    cover: "https://m.media-amazon.com/images/I/81XSxDGr0xL._SL1500_.jpg",
  },
  {
    title: "Haunting Adeline",
    cover: "https://m.media-amazon.com/images/I/91foIfs9XeL._SL1500_.jpg",
  },
  {
    title: "Between Love and Loathing",
    cover: "https://m.media-amazon.com/images/I/913TWv0yAUL._SL1500_.jpg",
  },
  {
    title: "Finally Forever",
    cover: "https://m.media-amazon.com/images/I/61QFRaahGhL._SL1200_.jpg",
  },
  {
    title: "All the Little Raindrops",
    cover: "https://m.media-amazon.com/images/I/81sRikHUh6L._SL1500_.jpg",
  },
  {
    title: "Things We Left Behind",
    cover: "https://m.media-amazon.com/images/I/81vH6kaT1jL._SL1500_.jpg",
  },
];

const mysteryBooks = [
  {
    title: "The 13th Horseman",
    cover: "https://m.media-amazon.com/images/I/61gi7AsOVeL._SL1173_.jpg",
  },
  {
    title: "Palm Beach Deadly",
    cover: "https://m.media-amazon.com/images/I/91X8Lt3r4AL._SL1500_.jpg",
  },
  {
    title: "Dead to Rights",
    cover: "https://m.media-amazon.com/images/I/816N+EDLQgL._SL1500_.jpg",
  },
  {
    title: "Echoes Fade",
    cover: "https://m.media-amazon.com/images/I/71okBz1KJfL._SL1500_.jpg",
  },
  {
    title: "Jack and Kill",
    cover: "https://m.media-amazon.com/images/I/8134kElldTL._SL1500_.jpg",
  },
  {
    title: "Prepper Jack: Hunting Lee Child's Jack Reacher",
    cover: "https://m.media-amazon.com/images/I/91sgYo8wfKL._SL1500_.jpg",
  },
  {
    title: "Remarkably Bright Creatures",
    cover: "https://m.media-amazon.com/images/I/81X7rAcaQkL._SL1500_.jpg",
  },
  {
    title: "None of This Is True",
    cover: "https://m.media-amazon.com/images/I/81vY9hRyKgL._SL1500_.jpg",
  },
  {
    title: "Judgment Prey",
    cover: "https://m.media-amazon.com/images/I/81-t3N58oyL._SL1500_.jpg",
  },
];

/* eslint-disable */
export default function favourites() {
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

      <div className='text-xl mt-5 mb-5'>
        <Separator className='border' />
        <div className='flex flex-row flex-wrap mt-2 justify-center'>
          {mysteryBooks.map((book) => (
            <Link
              href={`/book/14299148`}
              key={14299148}
              className='flex flex-row flex-wrap mt-2 justify-center'
            >
              <Image
                key={book.title}
                src={book.cover}
                alt={book.title}
                width='100'
                height='100'
                className='m-2 rounded-xl shadow-lg'
              />
            </Link>
          ))}
        </div>
      </div>

      <div className='text-xl mt-5 mb-5'>
        <Separator className='border' />
        <div className='flex flex-row flex-wrap mt-2 justify-center'>
          {romanceBooks.map((book) => (
            <Link
              href={`/book/14299148`}
              key={14299148}
              className='flex flex-row flex-wrap mt-2 justify-center'
            >
              <Image
                key={book.title}
                src={book.cover}
                alt={book.title}
                width='100'
                height='100'
                className='m-2 rounded-xl shadow-lg'
              />
            </Link>
          ))}
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
        <button className='px-3 py-1 border rounded-r-md border-gray-300 hover:bg-gray-200 focus:outline-none'>
          <span className='material-icons'>
            <ChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
}
