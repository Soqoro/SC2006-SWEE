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
  Pencil,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";

/* eslint-disable */
export default function Discussion() {
  const { data: session } = useSession();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [postComment, setPostComment] = useState("");
  const [likes, setLikes] = useState(19);
  const [clickReply, setClickReply] = useState(false);
  const [reply, setReply] = useState("");
  const [submitReply, setSubmitReply] = useState(false);
  const [editOwnComment, setEditOwnComment] = useState(false);

  const { toast } = useToast();

  const handleEditChange = (e: any) => {
    setPostComment(e.target.value);
  };
  const handleSubmitEdit = () => {
    setEditOwnComment(false);
    toast({
      title: "Suceessfully edited comment!",
    });
  };
  const handleEditComment = () => {
    setEditOwnComment(!editOwnComment);
  };
  const handleReply = () => {
    setClickReply(!clickReply);
  };

  const handleSubmitReply = () => {
    setClickReply(false);
    setSubmitReply(true);
  };

  const handleReplyChange = (e: any) => {
    setReply(e.target.value);
  };

  const handleAddFriend = () => {
    toast({
      title: "Suceessfully added friend!",
    });
  };
  const handleDeleteComment = () => {
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast({
      title: "Suceessfully added post!",
    });
  };

  const handleUpVotes = () => {
    setLikes(likes + 1);
  };
  const handleDownVotes = () => {
    setLikes(likes - 1);
  };
  const handleCommentChange = (e: any) => {
    setPostComment(e.target.value);
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
          onChange={handleCommentChange}
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
          <Button
            className='bg-gray-400 text-black py-1 px-4 rounded'
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </div>
      </div>

      <div className='w-full max-w-3xl mx-auto mt-5 relative'>
        {isSubmitted && (
          <div className='flex mb-4'>
            <div className='flex-shrink-0 z-10 relative'>
              <img
                src={session?.user.image ?? undefined}
                alt="QR's Avatar"
                className='w-8 h-8 rounded-full mr-4 ml-4'
              />
              <div className='top-0 left-6 w-0.5 h-full bg-gray-300 z-0 ml-6 mt-2'></div>
            </div>
            <div className='flex flex-col pl-4 ml-4'>
              <span className='font-semibold'>Qi Rong</span>
              <span className='text-gray-500 text-sm'>- 1 second ago</span>
              {!editOwnComment ? (
                <p className='mt-2'>{postComment}</p>
              ) : (
                <div className='flex flex-col rounded-xl border border-black p-2'>
                  <Textarea
                    className='rounded-xl'
                    onChange={handleEditChange}
                    value={postComment}
                    placeholder="What's your reply?"
                  />
                  <div className='flex flex-row justify-between mt-1'>
                    <Button
                      variant='outline'
                      className='rounded-xl'
                      onClick={handleEditComment}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant='outline'
                      className='rounded-xl'
                      onClick={handleSubmitEdit}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
              <div className='flex items-center mt-3 space-x-3'>
                <Button
                  className='text-green-500 mr-0 p-0'
                  onClick={handleUpVotes}
                >
                  ↑ 0
                </Button>
                <Button
                  className='text-red-500 ml-0 p-0'
                  onClick={handleDownVotes}
                >
                  ↓
                </Button>
                <Button className='text-gray-400 m-0 p-0'>Reply</Button>
                <Popover>
                  <PopoverTrigger className='text-gray-400'>...</PopoverTrigger>
                  <PopoverContent className='bg-white'>
                    <div className='flex flex-col'>
                      <PopoverPrimitive.Close>
                        <Button
                          className='flex flex-row items-center gap-2 mb-2'
                          onClick={handleEditComment}
                        >
                          <Pencil /> Edit Comment
                        </Button>
                      </PopoverPrimitive.Close>
                      <Separator className='border' />
                      <PopoverPrimitive.Close>
                        <Button
                          className=' flex flex-row items-center gap-2 mt-2'
                          onClick={handleDeleteComment}
                        >
                          <AlertCircle className='text-red-500' />
                          Delete Comment
                        </Button>
                      </PopoverPrimitive.Close>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        <div className='w-full max-w-3xl mx-auto mt-5 relative'>
          <div className='absolute top-0 left-6 w-0.5 h-full bg-gray-300 z-0'></div>
          {/* Danny's Comment */}
          <div className='flex mb-4'>
            <div className='flex-shrink-0 z-10 relative'>
              <Dialog>
                <DialogTrigger>
                  <img
                    src='/MUser2.png'
                    alt="Danny's Avatar"
                    className='w-16 h-132 rounded-full mr-4 z-10 relative'
                  />
                </DialogTrigger>
                <DialogContent className='bg-white pt-0'>
                  <DialogHeader>
                    <DialogTitle className='flex items-center justify-center'>
                      <img
                        src='/MUser2.png'
                        alt="Danny's Avatar"
                        className='w-48 h-48 rounded-full'
                      />
                    </DialogTitle>
                    <DialogDescription className='flex flex-col gap-2'>
                      <div className='flex flex-col'>
                        <span className='underline'>Favourite Book:</span>
                        <span className='font-bold'>Pride and Prejudice</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='underline'>Favourite Quote:</span>
                        <span className='font-bold'>
                          “In three words I can sum up everything I've learned
                          about life: it goes on.” - Robert Frost
                        </span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='underline'>Favourite Genre:</span>
                        <span className='font-bold'>Romance</span>
                      </div>
                      <div>
                        <span className='underline'>Bio:</span>
                      </div>
                      <div className='rounded-lg border p-2 border-black'>
                        Enthralled by the dance of courtship and the sparks of a
                        love that defies odds, I find solace and adventure
                        within the pages of romance novels. From the smoldering
                        glances in Regency ballrooms to the heart-racing modern
                        love stories that leap off the page, I am a devoted
                        connoisseur of the love story in all its forms. My
                        bookshelves are a testament to my passion, adorned with
                        weathered classics that whisper of timeless love, and
                        contemporary tales that pulse with today's fiery hearts.
                        As a romance book lover, I live for the moment when love
                        triumphs, and happily ever after is not just an ending,
                        but a promise of more to come.
                      </div>
                      <DialogPrimitive.Close>
                        <Button variant='outline' onClick={handleAddFriend}>
                          Add friend
                        </Button>
                      </DialogPrimitive.Close>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className='flex flex-col pl-4 mt-5'>
              <span className='font-semibold'>Danny</span>
              <span className='text-gray-500 text-sm'>- 10 hours ago</span>
              <p className='mt-2'>
                Totally agree! Picked it up on a whim and couldn't put it down.
                One of the best thrillers I've read in a long time.
              </p>
              <div className='flex items-center mt-3 space-x-3'>
                <Button
                  className='text-green-500 mr-0 p-0'
                  onClick={handleUpVotes}
                >
                  ↑ {likes}
                </Button>
                <Button
                  className='text-red-500 ml-0 p-0'
                  onClick={handleDownVotes}
                >
                  ↓
                </Button>
                <Button className='text-gray-400 m-0 p-0'>Reply</Button>
                <div className='text-gray-400'>...</div>
              </div>
            </div>
          </div>

          {/* Space for staggered effect */}
          <div className='h-8'></div>

          {/* Kelly's Comment */}
          <div className='flex ml-32'>
            <div className='flex-shrink-0 -ml-16 z-10 relative'>
              <div className='absolute top-0 left-6 w-0.5 h-full bg-gray-300 z-0 '></div>
              <Dialog>
                <DialogTrigger>
                  <img
                    src='/MUser4.png'
                    alt="Kelly's Avatar"
                    className='w-16 h-132 rounded-full mr-4 z-10 relative'
                  />
                </DialogTrigger>
                <DialogContent className='bg-white pt-0'>
                  <DialogHeader>
                    <DialogTitle className='flex items-center justify-center'>
                      <img
                        src='/MUser4.png'
                        alt="Kelly's Avatar"
                        className='w-48 h-48 rounded-full'
                      />
                    </DialogTitle>
                    <DialogDescription className='flex flex-col gap-2'>
                      <div className='flex flex-col'>
                        <span className='underline'>Favourite Book:</span>
                        <span className='font-bold'>The Good Lie</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='underline'>Favourite Quote:</span>
                        <span className='font-bold'>
                          “And, when you want something, all the universe
                          conspires in helping you to achieve it.” - Paulo
                          Coelho
                        </span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='underline'>Favourite Genre:</span>
                        <span className='font-bold'>Mystery</span>
                      </div>
                      <div>
                        <span className='underline'>Bio:</span>
                      </div>
                      <div className='rounded-lg border p-2 border-black'>
                        Cloaked in shadows and intrigued by the unknown, I'm a
                        devoted aficionado of life's unsolved puzzles. Whether
                        it's a spine-chilling thriller, a real-life enigma, or
                        the twist in a classic whodunit, I revel in the thrill
                        of the chase. Looking for fellow sleuths who share my
                        passion for the mysterious and the unexplained. Let's
                        unravel the world's best-kept secrets together.
                      </div>
                      <DialogPrimitive.Close>
                        <Button variant='outline' onClick={handleAddFriend}>
                          Add friend
                        </Button>
                      </DialogPrimitive.Close>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
                <Button className='text-gray-400 m-0 p-0' onClick={handleReply}>
                  Reply
                </Button>
                <span className='text-gray-400'>...</span>
              </div>
              {clickReply && (
                <div className='flex flex-col rounded-xl border border-black p-2'>
                  <Textarea
                    className='rounded-xl'
                    onChange={handleReplyChange}
                    placeholder="What's your reply?"
                  />
                  <div className='flex flex-row justify-between mt-1'>
                    <Button
                      variant='outline'
                      className='rounded-xl'
                      onClick={handleReply}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant='outline'
                      className='rounded-xl'
                      onClick={handleSubmitReply}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}

              {submitReply && (
                <div className='flex mb-4 mt-2'>
                  <div className='flex-shrink-0 z-10 relative'>
                    <img
                      src={session?.user.image ?? undefined}
                      alt="QR's Avatar"
                      className='w-8 h-8 rounded-full mr-4 ml-4'
                    />
                    <div className='top-0 left-6 w-0.5 h-3/5 bg-gray-300 z-0 ml-6 mt-2'></div>
                  </div>

                  <div className='flex flex-col pl-4 ml-4'>
                    <span className='font-semibold'>Qi Rong</span>
                    <span className='text-gray-500 text-sm'>
                      - 1 second ago
                    </span>
                    <p className='mt-2'>{reply}</p>
                    <div className='flex items-center mt-3 space-x-3'>
                      <Button
                        className='text-green-500 mr-0 p-0'
                        onClick={handleUpVotes}
                      >
                        ↑ 0
                      </Button>
                      <Button
                        className='text-red-500 ml-0 p-0'
                        onClick={handleDownVotes}
                      >
                        ↓
                      </Button>
                      <Button className='text-gray-400 m-0 p-0'>Reply</Button>
                      <div className='text-gray-400'>...</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='w-full max-w-3xl mx-auto mt-5 relative'>
            {/* John's Comment */}

            {/* Vertical line */}
            <div className='absolute top-0 left-6 w-0.5 h-full bg-gray-300 z-0'></div>

            {/* John's Comment */}
            <div className='flex mb-4'>
              <div className='flex-shrink-0 z-10 relative'>
                <Dialog>
                  <DialogTrigger>
                    <img
                      src='/MUser3.png'
                      alt="John's Avatar"
                      className='w-16 h-132 rounded-full mr-4 z-10 relative'
                    />
                  </DialogTrigger>
                  <DialogContent className='bg-white pt-0'>
                    <DialogHeader>
                      <DialogTitle className='flex items-center justify-center'>
                        <img
                          src='/MUser3.png'
                          alt="John's Avatar"
                          className='w-48 h-48 rounded-full'
                        />
                      </DialogTitle>
                      <DialogDescription className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                          <span className='underline'>Favourite Book:</span>
                          <span className='font-bold'>The Good Lie</span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='underline'>Favourite Quote:</span>
                          <span className='font-bold'>
                            “And, when you want something, all the universe
                            conspires in helping you to achieve it.” - Paulo
                            Coelho
                          </span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='underline'>Favourite Genre:</span>
                          <span className='font-bold'>Mystery</span>
                        </div>
                        <div>
                          <span className='underline'>Bio:</span>
                        </div>
                        <div className='rounded-lg border p-2 border-black'>
                          Cloaked in shadows and intrigued by the unknown, I'm a
                          devoted aficionado of life's unsolved puzzles. Whether
                          it's a spine-chilling thriller, a real-life enigma, or
                          the twist in a classic whodunit, I revel in the thrill
                          of the chase. Looking for fellow sleuths who share my
                          passion for the mysterious and the unexplained. Let's
                          unravel the world's best-kept secrets together.
                        </div>
                        <DialogPrimitive.Close>
                          <Button variant='outline' onClick={handleAddFriend}>
                            Add friend
                          </Button>
                        </DialogPrimitive.Close>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className='flex flex-col pl-4 mt-5'>
                <span className='font-semibold'>John</span>
                <span className='text-gray-500 text-sm'>- 12 hours ago</span>
                <p className='mt-2'>
                  I had the ending spoiled for me, and I STILL enjoyed every
                  page. That says a lot about the quality of the writing. The
                  character depth in 'The Silent Patient' really sets it apart.
                  Michaelides' understanding of human psychology is commendable.
                  Anyone have similar book recommendations? Need my next fix!
                </p>
                <div className='flex items-center mt-3 space-x-3'>
                  <span className='text-green-500'>↑ 10</span>
                  <span className='text-red-500'>↓</span>
                  <Button className='text-gray-400 m-0 p-0'>Reply</Button>
                  <span className='text-gray-400'>...</span>
                </div>
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
        <button className='px-3 py-1 border rounded-r-md border-gray-300 hover:bg-gray-200 focus:outline-none'>
          <span className='material-icons'>
            <ChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
}
