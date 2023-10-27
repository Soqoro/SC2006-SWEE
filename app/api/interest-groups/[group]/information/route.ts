import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { sql } from "@/app/api/database";
import {
  InterestGroupInformation,
  updateInterestGroupInformation,
} from "@/app/api/interest-groups/[group]/information/utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Updates the given interest group if it exists and the user has the appropriate role.
 *
 * @param request the request which body should be a `InterestGroupInformation` in JSON.
 * @param params the group ID.
 * @return a status code of 200 if successful and 400 otherwise.
 */
export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      group: string;
    };
  },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const success = await updateInterestGroupInformation(
    sql,
    session.user.id,
    params.group,
    (await request.json()) as InterestGroupInformation,
  );
  return Response.json({}, { status: success ? 200 : 400 });
}
