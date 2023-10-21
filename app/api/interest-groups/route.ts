import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import {
  createInterestGroup,
  InterestGroupInformation,
  queryInterestGroups,
} from "@/app/api/interest-groups/utils";
import { sql } from "@/app/api/database";

/**
 * Returns the interest groups on the given page, in descending order of the `created_at` date.
 *
 * The URL should contain a non-negative integer `page` search parameter.
 *
 * @param request the request.
 * @return a response which body is an array of `InterestGroupOverview`s in JSON.
 */
export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  let page = parseInt(request.nextUrl.searchParams.get("page") ?? "") ?? 1;
  if (page <= 0) {
    page = 1;
  }

  return Response.json(await queryInterestGroups(sql, page), { status: 200 });
}

/**
 * Creates the given interest group if it does not exist.
 *
 * @param request the request which body should be a `InterestGroupInformation` in JSON.
 * @returns a status code of 200 if successful and 400 otherwise.
 */
export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const success = await createInterestGroup(
    sql,
    session.user.id,
    (await request.json()) as InterestGroupInformation,
  );
  return Response.json({}, { status: success ? 200 : 400 });
}
