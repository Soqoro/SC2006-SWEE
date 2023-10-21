import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { updateInterestGroupInformation } from "@/app/api/interest-groups/information/utils";
import { InterestGroupInformation } from "@/app/api/interest-groups/utils";
import { sql } from "@/app/api/database";

/**
 * Updates the given interest group if it exists and the user has the appropriate role.
 *
 * @param request the request which body should be a `InterestGroupInformation` in JSON.
 * @return a status code of 200 if successful and 400 otherwise.
 */
export async function PUT(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const success = await updateInterestGroupInformation(
    sql,
    session.user.id,
    (await request.json()) as InterestGroupInformation,
  );
  return Response.json({}, { status: success ? 200 : 400 });
}
