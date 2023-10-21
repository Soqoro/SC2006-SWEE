"use client";
import Link from "next/link";
import Image from "next/image";
import {
  PanelTop,
  Heart,
  SkipForward,
  UserSquare,
  Users,
  Settings,
  LogIn,
  LogOut,
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
import Google from "../icons/google";
import Meta from "../icons/meta";
import Apple from "../icons/apple";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn, signOut, useSession } from "next-auth/react";

const menuLinks = [
  { href: "/", label: "Browse" },
  { href: "/favourites", label: "Favourites" },
  { href: "/recommender", label: "Recommender" },
];

const socialLinks = [
  { href: "/friends", label: "Friends" },
  { href: "/interest-groups", label: "Interest Groups" },
];

const generalLinks = [{ href: "/settings", label: "Settings" }];
/* eslint-disable */
export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className='flex flex-col border-r-2 h-screen pr-32 pl-8 pt-10'>
      <div className='text-xl font-bold'>CoverQuest.</div>
      <br />
      <br />
      <div className='mb-6'>Menu</div>
      {menuLinks.map(({ href, label }) => (
        <Link key={href} href={href} className='flex flex-row mb-4'>
          {href === "/" ? <PanelTop className='pr-1' /> : null}
          {href === "/favourites" ? <Heart className='pr-1' /> : null}
          {href === "/recommender" ? <SkipForward className='pr-1' /> : null}
          {label}
        </Link>
      ))}
      <br />
      <br />
      <div className='mb-6'>Social</div>
      {socialLinks.map(({ href, label }) => (
        <Link key={href} href={href} className='flex flex-row mb-4'>
          {href === "/friends" ? <UserSquare className='pr-1' /> : null}
          {href === "/interest-groups" ? <Users className='pr-1' /> : null}
          {label}
        </Link>
      ))}
      <br />
      <br />
      <div className='mb-6'>General</div>
      {generalLinks.map(({ href, label }) => (
        <Link key={href} href={href} className='flex flex-row mb-4'>
          {href === "/settings" ? <Settings className='pr-1' /> : null}
          {label}
        </Link>
      ))}
      {!session && (
        <Dialog>
          <DialogTrigger className='flex flex-row'>
            <LogIn className='pr-1' />
            Login
          </DialogTrigger>
          <DialogContent className='bg-white max-w-3xl'>
            <DialogHeader>
              <DialogTitle>
                <div className='text-xl font-bold'>WELCOME BACK!</div>
                <div className='text-sm font-normal'>
                  Don&apos;t have a account?{" "}
                  <Button
                    className='p-0 text-sm font-normal text-indigo-500'
                    variant='link'
                  >
                    Sign up
                  </Button>
                </div>
              </DialogTitle>
              <DialogDescription className='flex flex-row items'>
                <div className='w-full flex flex-col justify-between'>
                  <div>
                    Username
                    <input
                      type='text'
                      placeholder='daniel123'
                      className='border-2 border-black rounded-xl p-2 w-full focus:outline-none'
                    />
                  </div>
                  <div>
                    Password
                    <input
                      type='password'
                      placeholder='********'
                      className='border-2 border-black rounded-xl p-2 w-full focus:outline-none'
                    />
                  </div>
                  <div className='flex flex-row justify-between items-center'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='terms' className='rounded-xl' />
                      <label
                        htmlFor='terms'
                        className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        Remember Me
                      </label>
                    </div>
                    <Button
                      className='p-0 text-sm font-normal m-0 text-indigo-400'
                      variant='link'
                    >
                      Forget Password?
                    </Button>
                  </div>
                  <Button className='mt-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-2xl'>
                    Sign In
                  </Button>
                  <div className='flex flex-row items-center w-full'>
                    <div className='flex-grow border-b my-4'></div>
                    <span className='mx-2 text-xs'>or Continue With</span>
                    <div className='flex-grow border-b my-4'></div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <Button
                      className='rounded-xl p-4'
                      variant='outline'
                      onClick={() => signIn("google")}
                    >
                      <Google />
                    </Button>
                    <Button className='rounded-xl p-4' variant='outline'>
                      <Meta />
                    </Button>
                    <Button className='rounded-xl p-4' variant='outline'>
                      <Apple />
                    </Button>
                  </div>
                </div>

                <Image
                  src='/LoginBanner.png'
                  alt='Login Banner Background'
                  width={500}
                  height={500}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      {session && (
        <Button
          onClick={() => {
            signOut();
          }}
          variant='outline'
        >
          <LogOut className='pr-1' />
          Log Out
        </Button>
      )}
    </div>
  );
}
