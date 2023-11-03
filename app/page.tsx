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
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type Book = {
  brn: string;
  title: string;
  author: string;
  isbns: string[];
  cover: string;
};

const mysteryBooks = [
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
  {
    title: "The Guest List: A Reese's Book Club Pick",
    cover: "https://m.media-amazon.com/images/I/81QEpeAxCxS._SL1500_.jpg",
  },
];

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
/* eslint-disable */
export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFrontNavigation = (e: any) => {
    e.preventDefault();
    window.history.forward();
  };

  const handleBackNavigation = (e: any) => {
    e.preventDefault();
    window.history.back();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      console.log(data);
      setBooks(data.books);
    } catch (error) {
      console.error(error);
      // Optionally set an error state here to show a message to the user.
    } finally {
      setIsLoading(false);
    }
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

      <div className='relative h-64 shadow-lg overflow-hidden mt-5 rounded-xl border-2'>
        <Image
          src='/banner.jpg'
          alt='Banner Background'
          width={1920}
          height={1080}
          className='absolute h-full w-full object-cover'
        />
        <Image
          src='/bannerBooks.png'
          alt='Banner Books'
          width={400}
          height={400}
          className='absolute right-0 top-[-30%]'
        />
        <div className='absolute bottom-0 p-4 w-full'>
          <h1 className='text-white text-2xl font-bold'>
            Exciting Summer Reads Now Available!
          </h1>
          <button className='text-white mt-2 underline'>View More</button>
        </div>
      </div>

      <div className='text-xl mt-5 mb-5'>
        Trending
        <Separator className='border-2' />
        {isLoading ? (
          <Skeleton className='w-1/2 rounded-full bg-gray' />
        ) : (
          <div className='flex flex-row flex-wrap mt-2'>
            {books
              .filter((book, index) => ![4, 5, 17].includes(index))
              .map((book) => (
                <Link href={`/book/${book.brn}`} key={book.brn}>
                  <Image
                    key={book.brn}
                    src={book.cover}
                    alt={book.title}
                    width='100'
                    height='100'
                    className='m-2 rounded-xl shadow-lg'
                  />
                </Link>
              ))}
          </div>
        )}
      </div>

      <div className='text-xl mt-5 mb-5'>
        Mystery
        <Separator className='border-2' />
        {isLoading ? (
          <Skeleton className='w-1/2 rounded-full bg-black' />
        ) : (
          <div className='flex flex-row flex-wrap mt-2'>
            {mysteryBooks.map((book) => (
              <Image
                key={book.title}
                src={book.cover}
                alt={book.title}
                width='100'
                height='100'
                className='m-2 rounded-xl shadow-lg'
              />
            ))}
          </div>
        )}
      </div>

      <div className='text-xl mt-5 mb-5'>
        Romance
        <Separator className='border-2' />
        {isLoading ? (
          <Skeleton className='w-1/2 rounded-full bg-black' />
        ) : (
          <div className='flex flex-row flex-wrap mt-2'>
            {romanceBooks.map((book) => (
              <Image
                key={book.title}
                src={book.cover}
                alt={book.title}
                width='100'
                height='100'
                className='m-2 rounded-xl shadow-lg'
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
