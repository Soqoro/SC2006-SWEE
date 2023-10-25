import {NextRequest} from "next/server";
import {getServerSession} from "next-auth/next";
import {queryNLB} from "@/app/api/books/utils";

/**
 * Returns up to 20 recommended books.
 *
 * The URL should contain a non-negative integer `page` search parameter.
 *
 * @param request the request.
 * @return a response which body contains an array of `Book`s associated with the `books` key in JSON.
 */
export async function GET(
  // eslint-disable-next-line
  request: NextRequest,
) {
  const session = await getServerSession();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const books = await queryNLB();
  return Response.json(
    {
      books: books
    },
    { status: 200 },
  );
}