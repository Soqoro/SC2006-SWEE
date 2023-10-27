"use client";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  ListFilter,
  Bell,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Star from "@/components/icons/star";
import YellowStar from "@/components/icons/yellowstar";

type bookInfo = {
  brn: string;
  title: string;
  aggregatedRating: number;
  author: string;
  cover: string;
  description: string;
  subjects: string[];
  comments: string[];
  favourite: boolean;
  isbns: string[];
  rating: number;
};

/* eslint-disable */
export default function Book({ params }: { params: { brn: string } }) {
  const [bookDetails, setDetails] = useState<bookInfo>({} as bookInfo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/books/${params.brn}`, {
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
      setDetails(data);
    } catch (error) {
      console.error(error);
      // Optionally set an error state here to show a message to the user.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex w-full flex-col p-10'>
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
      <div className='flex flex-row items-center gap-1 mt-5 pl-2'>
        <Heart /> Favourite this book?
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-row'>
          <Image
            key={bookDetails?.brn}
            src={bookDetails?.cover}
            alt={bookDetails?.title}
            width='300'
            height='300'
            className='m-2 rounded-xl shadow-lg'
          />

          <div className='flex flex-col gap-2 '>
            <div className='rounded-xl border-2 p-2 text-center font-bold border-black'>
              {bookDetails?.title}
            </div>
            <div className='rounded-xl border-2 p-2 text-center border-black'>
              {bookDetails?.description ||
                `Book written by ${bookDetails?.author}`}
            </div>
            <div className='rounded-xl border-2 text-center p-2 border-black'>
              Find my at NLB under <br />
              <span className='font-bold'>
                {bookDetails?.subjects?.[0]}
              </span>{" "}
              section
            </div>
          </div>
        </div>
      )}

      <div className='font-bold border-b-2'>Ratings & Discussion</div>
      <div className='flex flex-row mt-1'>
        <YellowStar />
        <YellowStar />
        <YellowStar />
        <YellowStar />
        <Star />
      </div>

      <div className='flex flex-col border-2 rounded-xl p-2 mt-5 border-black'>
        <div className='flex flex-row'>
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <YellowStar />
        </div>
        <div className='font-bold mb-2'>Loved the book!</div>
        <div>
          Absolutely enchanting! This romance book swept me off my feet from the
          very first page. The chemistry between the characters is electric, and
          the emotional depth of their journey left me breathless. A beautifully
          written love story that I couldn't put down. Five stars!
          <br />
          <br />
          Annonymous, August 3, 2021
        </div>
      </div>
      <div className='flex flex-col border-2 rounded-xl p-2 mt-5 border-black'>
        <div className='flex flex-row'>
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <Star />
        </div>
        <div className='font-bold mb-2'>It was an amazing read!</div>
        <div>
          A captivating romance read that had me hooked! The characters were
          well-developed, and their love story was heartwarming. While I
          thoroughly enjoyed it, there were a few moments where the plot felt a
          bit predictable. Nonetheless, a solid four-star romance novel!
          <br />
          <br />
          John Doe, July 1, 2021
        </div>
      </div>
    </div>
  );
}
