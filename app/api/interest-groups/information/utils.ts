import { InterestGroupInformation } from "@/app/api/interest-groups/utils";
import { Sql } from "postgres";

/**
 * Updates the given interest group if it already exists.
 *
 * @param sql the database
 * @param user the user
 * @param group the group
 * @return true if the interest group was updated.
 */
export async function updateInterestGroupInformation(
  sql: Sql,
  user: string,
  group: InterestGroupInformation,
): Promise<boolean> {
  return await sql.begin(async (sql) => {
    const [row]: [{ role: string }?] = await sql`
      SELECT role FROM user_group_user_profile WHERE group_id = ${group.id} AND user_id = ${user};
    `;

    const moderator = row?.role == "moderator";
    if (moderator) {
      await sql`
        UPDATE user_group SET name = ${group.name}, description = ${group.description}, image = ${group.image}
          WHERE id = ${group.id};
      `;
    }

    return moderator;
  });
}
