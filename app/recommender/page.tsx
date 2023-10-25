"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Recommender() {
  return (
    <div className='w-full flex justify-center flex-col items-center gap-10'>
      <Card
        className='w-1/2 p-5 rounded-xl'
        style={{ boxShadow: "0 4px 6px rgba(30, 144, 255, 0.5)" }}
      >
        <CardContent>
          <Select>
            <SelectTrigger className='w-[180px] rounded-xl'>
              <SelectValue placeholder='Genre' />
            </SelectTrigger>
            <SelectContent className='bg-slate-50'>
              <SelectItem value='mystery'>Mystery</SelectItem>
              <SelectItem value='romance'>Romance</SelectItem>
              <SelectItem value='thriller'>Thriller</SelectItem>
              <SelectItem value='fantasy'>Fantasy</SelectItem>
              <SelectItem value='horror'>Horror</SelectItem>
              <SelectItem value='biography'>Biography</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            className='mt-5 rounded-xl'
            placeholder='Type the description of what you like to read here.'
          />
          <div className='text-right'>
            <Button variant='outline' className='mt-5 rounded-xl'>
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className='w-1/2 p-5 rounded-xl'
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 128, 0.5)" }}
      >
        <CardContent className='flex items-center justify-center h-full'>
          <div className='rounded-xl border w-[300px] p-2 border-black'>
            Based on your inputs, we recommend:
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
