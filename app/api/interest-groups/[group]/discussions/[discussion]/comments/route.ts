import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { sql } from "@/app/api/database";
import {
  createComment,
  DiscussionComment,
  queryComments,
} from "@/app/api/interest-groups/[group]/discussions/[discussion]/comments/utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Returns an interest group's discussion's comments on the given page, in descending order of the `created_at` date.
 *
 * The URL should contain a non-negative integer `page` search parameter.
 *
 * @param request the request.
 * @return a response which body is an array of `Comment`s in JSON.
 */
export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      group: string;
      discussion: string;
    };
  },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  let page = parseInt(request.nextUrl.searchParams.get("page") ?? "") || 1;
  if (page <= 0) {
    page = 1;
  }

  return Response.json(
    await queryComments(sql, session.user.id, params.discussion, page),
    { status: 200 },
  );
}

/**
 * Creates the given comment if it does not exist.
 *
 * @param request the request which body should be a `Comment` in JSON.
 * @param params the comment.
 * @returns a status code of 200 if successful and 400 otherwise.
 */
export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      group: string;
      discussion: string;
    };
  },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const success = await createComment(
    sql,
    session.user.id,
    params.group,
    params.discussion,
    (await request.json()) as DiscussionComment,
  );
  return Response.json({}, { status: success ? 200 : 400 });
}
