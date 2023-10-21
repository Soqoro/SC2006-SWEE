import { getServerSession } from "next-auth/next";
import { sql } from "@/app/api/database";
import { NextRequest } from "next/server";
import {
  queryComments,
  queryNLB,
  queryOpenLibrary,
  queryUserBookInformation,
} from "@/app/api/books/[brn]/utils";

/**
 * Returns the given book's information, comments and ratings.
 *
 * The URL should contain a non-negative integer `page` search parameter.
 *
 * @param request the request.
 * @param params the book's BRN.
 */
export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      brn: string;
    };
  },
) {
  const session = await getServerSession();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  let page = parseInt(request.nextUrl.searchParams.get("page") ?? "") ?? 1;
  if (page <= 0) {
    page = 1;
  }

  const nlbInformation = await queryNLB(params.brn);
  if (!nlbInformation) {
    return Response.json({}, { status: 404 });
  }

  const isbn = nlbInformation.isbns.length == 0 ? "" : nlbInformation.isbns[0];

  const openLibraryInformation = await queryOpenLibrary(isbn);
  const userInformation = await queryUserBookInformation(
    sql,
    params.brn,
    session.user.id,
  );
  const userComments = await queryComments(sql, params.brn, page);

  return Response.json(
    {
      ...nlbInformation,
      ...openLibraryInformation,
      ...userInformation,
      comments: userComments,
    },
    { status: 200 },
  );
}
