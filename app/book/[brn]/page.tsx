"use client";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

/* eslint-disable */
export default function Book({ params }: { params: { brn: string } }) {
  const [nlbInfo, setInfo] = useState([]);
  const [openlibInfo, setlibInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [comments, setComments] = useState([]);
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
    } catch (error) {
      console.error(error);
      // Optionally set an error state here to show a message to the user.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex w-full flex-col p-4'>
      <div className='flex flex-row items-center gap-1'>
        <Heart /> Favourite this book?
      </div>

      <div className='flex flex-row'>
        <div>Image</div>

        <div className='flex flex-col'>Title</div>
      </div>
    </div>
  );
}
