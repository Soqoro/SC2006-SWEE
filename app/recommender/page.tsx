"use client";
import { SyntheticEvent, useState } from "react";
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
import { useSession } from "next-auth/react";
import Modal from "react-modal";
import CircleLoader from "react-spinners/CircleLoader";

type Book = {
  isbn13: string;
  isbn10: string;
  title: string;
  subtitle: string;
  authors: string;
  categories: string;
  thumbnail: string;
  description: string;
  published_year: string;
  average_rating: string;
  num_pages: string;
  ratings_count: string;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "90%",
    height: "80%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
  },
};
/* eslint-disable */
export default function Recommender() {
  const { data: session } = useSession();
  const [selectedBook, setSelectedbook] = useState<Book | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [query, setQuery] = useState("");
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (book_title: string) => {
    const bookSelection = recommendedBooks.filter((book: Book) => {
      return book.title === book_title;
    });
    console.log(bookSelection);
    setSelectedbook(bookSelection[0]);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getRecommendations = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Check Inputs
    if (query === "") {
      alert("Please let us know what you'd like to learn!");
      return;
    }

    setIsLoading(true);

    await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
      })
      .then((recommendations) => {
        console.log(recommendations.data.Get.Book);
        setRecommendedBooks(recommendations.data.Get.Book);
      });

    setIsLoading(false);
    setLoadedOnce(true);
  };

  return (
    <div className='w-full flex justify-center flex-col items-center gap-10'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='flex justify-between'>
          <h3 className='mt-2 text-lg font-semibold text-gray-700'>
            {selectedBook?.title}
          </h3>
          <Button
            className='hover:font-bold rounded hover:bg-gray-700 p-2 w-20 hover:text-white '
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
        <div>
          <div className='flex justify-center py-10'>
            <div className='w-48 h-72'>
              <img
                src={selectedBook?.thumbnail}
                alt={"Thumbnail of the book " + selectedBook?.title}
                className='w-full h-full rounded-lg shadow-lg'
              />
            </div>
          </div>
          <div>
            <p className='mt-1 text-gray-500'>
              <span className='font-bold'>Authors</span>:{" "}
              {selectedBook?.authors}
            </p>
            <p>
              <span className='font-bold'>Genre</span>:{" "}
              {selectedBook?.categories}
            </p>
            <p>
              <span className='font-bold'>Rating</span>:{" "}
              {selectedBook?.average_rating}
            </p>
            <p>
              <span className='font-bold'>Publication Year</span>:{" "}
              {selectedBook?.published_year}
            </p>
            <br />
            <p>{selectedBook?.description}</p>

            <div className='flex justify-center'>
              <a
                className='hover:animate-pulse'
                target='_blank'
                href={"https://www.amazon.com/s?k=" + selectedBook?.isbn10}
              >
                <img
                  className='w-60'
                  src='https://kentuckynerd.com/wp-content/uploads/2019/05/amazon-buy-now-button.jpg'
                />
              </a>
            </div>
          </div>
        </div>
      </Modal>
      {session ? (
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
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <div className='text-right'>
                <Button
                  variant='outline'
                  className='mt-5 rounded-xl'
                  onClick={getRecommendations}
                >
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>
          {/*<Card
            className='w-1/2 p-5 rounded-xl'
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 128, 0.5)" }}
          >
            <CardContent className='flex items-center justify-center h-full'>
              <div className='rounded-xl border w-[300px] p-2 border-black'>
                Based on your inputs, we recommend:
              </div>
            </CardContent>
          </Card>*/}
          {isLoading ? (
            <div className='w-full flex justify-center h-60 pt-10'>
              <CircleLoader
                color={"#000000"}
                loading={isLoading}
                size={100}
                aria-label='Loading'
                data-testid='loader'
              />
            </div>
          ) : (
            <>
              {loadedOnce ? (
                <>
                  <h2 className='text-2xl font-bold mb-4 text-center'>
                    Recommended Books
                  </h2>
                  <div
                    id='recommended-books'
                    className='flex overflow-x-scroll pb-10 hide-scroll-bar'
                  >
                    {/* <!-- Recommended books dynamically added here --> */}
                    <section className='container mx-auto mb-12'>
                      <div className='flex flex-wrap -mx-2'>
                        {recommendedBooks.map((book: Book) => {
                          return (
                            <div
                              key={book.isbn10 || book.isbn13}
                              className='w-full md:w-1/3 px-2 mb-4 animate-pop-in'
                            >
                              <div className='bg-white p-6 flex items-center flex-col'>
                                <h3 className='text-xl font-semibold mb-4 line-clamp-1'>
                                  {book.title}
                                </h3>
                                <div className='w-48 h-72'>
                                  <img
                                    src={book.thumbnail}
                                    alt={"Thumbnail of the book " + book.title}
                                    className='w-full h-full rounded-lg shadow-lg'
                                  />
                                </div>
                                <p className='mt-4 text-gray-500 line-clamp-1'>
                                  {book.authors}
                                </p>
                                <div className='flex'>
                                  <Button
                                    className='bg-black text-white w-full rounded-md hover:bg-gray-800 hover:text-white'
                                    type='submit'
                                    variant='outline'
                                    onClick={() => {
                                      openModal(book.title);
                                    }}
                                  >
                                    Learn More
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </div>
                </>
              ) : (
                <div className='w-full flex justify-center h-60 pt-10'></div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className='w-full flex justify-center flex-col items-center gap-10'>
          <Card
            className='w-1/2 p-5 rounded-xl border-red-500'
            style={{ boxShadow: "0 4px 6px rgba(255, 0, 0, 0.5)" }}
          >
            <CardContent className='flex items-center justify-center h-full font-bold'>
              Sign in to use this feature.
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
