import {
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  ListFilter,
  Bell,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

      <div className='rounded-xl flex items-center justify-center border-2 border-black mt-10'>
        <Button className='rounded-full border-2 border-black flex items-center justify-center m-2'>
          <span className='text-xl font-bold'>+</span>
        </Button>
      </div>
    </div>
  );
}
