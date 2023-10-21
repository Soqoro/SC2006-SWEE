import { getServerSession } from "next-auth/next";
import { sql } from "@/app/api/database";
import { NextRequest } from "next/server";
import {
  comments,
  nlb,
  openLibrary,
  userBookInformation,
} from "@/app/api/books/[brn]/utils";

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

  const nlbInformation = await nlb(params.brn);
  if (!nlbInformation) {
    return Response.json({}, { status: 404 });
  }

  const isbn = nlbInformation.isbns.length == 0 ? "" : nlbInformation.isbns[0];

  const openLibraryInformation = await openLibrary(isbn);
  const userInformation = await userBookInformation(
    sql,
    params.brn,
    session.user.id,
  );
  const userComments = await comments(sql, params.brn, page);

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
