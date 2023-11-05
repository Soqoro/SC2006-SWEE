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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

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
  const [isFavourite, setIsFavourite] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [commentTitle, setCommentTitle] = useState("");
  const [commentDescription, setCommentDescription] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const { data: session } = useSession();

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(selectedRating)}
          onClick={() => {
            setSelectedRating(i);
            setHoverRating(i);
          }}
        >
          <Star
            fill={i <= (hoverRating || selectedRating) ? "yellow" : "none"}
          />
        </div>,
      );
    }
    return stars;
  };
  // Create an array of stars based on the rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        fill={i <= selectedRating ? "yellow" : "none"} // Yellow or grey
      />,
    );
  }

  const { toast } = useToast();

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const handleCommentTitleChange = (e: any) => {
    setCommentTitle(e.target.value);
  };

  const handleCommentDescriptionChange = (e: any) => {
    setCommentDescription(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast({
      title: "Suceessfully added comment!",
    });
  };

  const handleFrontNavigation = (e: any) => {
    e.preventDefault();
    window.history.forward();
  };

  const handleBackNavigation = (e: any) => {
    e.preventDefault();
    window.history.back();
  };

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
      <div>
        <div className='flex flex-row items-center gap-1 mt-5 pl-2 font-bold'>
          <Heart
            className={isFavourite ? "text-red-500" : "text-gray-400"}
            onClick={toggleFavourite}
          />{" "}
          Favourite this book?
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

            <div className='flex flex-col gap-3 w-3/5 ml-20 mt-5'>
              <div className='rounded-xl border-2 p-2 text-center font-bold border-black text-xl'>
                {bookDetails?.title}
              </div>
              <div className='rounded-xl border-2 p-2 text-center border-black'>
                {bookDetails?.description || (
                  <>
                    Book written by{" "}
                    <span className='font-bold'>{bookDetails?.author}</span>
                  </>
                )}
              </div>
              <div className='rounded-xl border-2 p-2 text-center border-black'>
                The first hilarious book in Barry&apos;s AFTERWORLDS sequence.
                Drake has just met the Horsemen of the Apocalypse but is that
                really the end of the world? Pratchett meets Python in this dark
                comic fantasy with plenty of action, perfect for 11+ boys Drake
                is surprised to find three horsemen of the apocalypse playing
                snakes and ladders in his garden shed. He&apos;s even more
                surprised when they insist that he is one of them. They&apos;re
                missing a Horseman, having gone through several Deaths and they
                think that Drake is the boy for the job. At first he&apos;s
                reluctant to usher in Armageddon but does being in charge of
                Armageddon have to spell the end of the world? An apocalyptic
                blend of riotous comedy, heart-stopping action and a richly
                imagined fantasy adventure.
              </div>
              <div className='rounded-xl border-2 text-center p-2 border-black'>
                Find me at NLB under <br />
                <span className='font-bold'>
                  {bookDetails?.subjects?.[0]}
                </span>{" "}
                section
              </div>
            </div>
          </div>
        )}

        <div className='font-bold border-b-2 text-xl mt-5 mb-2'>
          Ratings & Discussion
          <Dialog>
            <DialogTrigger className='rounded-xl ml-5 mb-2 p-2 font-normal text-sm border border-black bg-orange-500'>
              Add comments
            </DialogTrigger>
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogDescription>
                  <div className='flex flex-row items-center'>
                    <span className='font-bold mr-1'>Ratings: </span>
                    {renderStars()}
                  </div>
                  <Input
                    placeholder='Enter your comment title'
                    className='mt-2'
                    onChange={handleCommentTitleChange}
                  />
                  <Textarea
                    className='mt-2'
                    placeholder='Enter your comment description'
                    onChange={handleCommentDescriptionChange}
                  />
                  <DialogPrimitive.Close>
                    <Button
                      className='mt-2'
                      variant='outline'
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </DialogPrimitive.Close>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className='flex flex-row mt-1'>
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <Star />
        </div>

        {isSubmitted && (
          <div className='flex flex-col border-2 rounded-xl p-2 mt-5 border-black'>
            <div className='flex flex-row'>{stars}</div>
            <div className='font-bold mb-2'>{commentTitle}</div>
            <div>
              {commentDescription}
              <br />
              <br />
              Qi Rong , Nov 8, 2023
            </div>
          </div>
        )}

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
            Absolutely enchanting! This romance book swept me off my feet from
            the very first page. The chemistry between the characters is
            electric, and the emotional depth of their journey left me
            breathless. A beautifully written love story that I couldn't put
            down. Five stars!
            <br />
            <br />
            Annonymous, August 3, 2021
          </div>
        </div>
        {!isSubmitted && (
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
              thoroughly enjoyed it, there were a few moments where the plot
              felt a bit predictable. Nonetheless, a solid four-star romance
              novel!
              <br />
              <br />
              John Doe, July 1, 2021
            </div>
          </div>
        )}
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
    </div>
  );
}
