import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { sql } from "@/app/api/database";
import {
  createDiscussion,
  DiscussionOverview,
  queryDiscussions,
} from "@/app/api/interest-groups/[group]/discussions/utils";

/**
 * Returns an interest group's discussions on the given page, in descending order of the `created_at` date.
 *
 * The URL should contain a non-negative integer `page` search parameter.
 *
 * @param request the request.
 * @return a response which body is an array of `InterestGroupOverview`s in JSON.
 */
export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      group: string;
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

  return Response.json(await queryDiscussions(sql, params.group, page), {
    status: 200,
  });
}

/**
 * Creates the given discussion if it does not exist.
 *
 * @param request the request which body should be a `DiscussionOverview` in JSON.
 * @param params the interest group.
 * @returns a status code of 200 if successful and 400 otherwise.
 */
export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      group: string;
    };
  },
) {
  const session = await getServerSession();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const success = await createDiscussion(
    sql,
    session.user.id,
    params.group,
    (await request.json()) as DiscussionOverview,
  );
  return Response.json({}, { status: success ? 200 : 400 });
}
