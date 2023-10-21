import { Sql } from "postgres";

export interface InterestGroupInformation {
  /**
   * The name.
   */
  name: string;
  /**
   * The description.
   */
  description: string;
  /**
   * The group's image as a base-64 string.
   */
  image: string;
}

/**
 * Updates the given interest group if it already exists.
 *
 * @param sql the database
 * @param user the user
 * @param group the group ID
 * @param information the group information
 * @return true if the interest group was updated.
 */
export async function updateInterestGroupInformation(
  sql: Sql,
  user: string,
  group: string,
  information: InterestGroupInformation,
): Promise<boolean> {
  return await sql.begin(async (sql) => {
    const [row]: [{ role: string }?] = await sql`
      SELECT role FROM user_group_user_profile WHERE group_id = ${group} AND user_id = ${user};
    `;

    const moderator = row?.role == "moderator";
    if (moderator) {
      await sql`
        UPDATE user_group SET name = ${information.name}, description = ${information.description}, image = ${information.image}
          WHERE id = ${group};
      `;
    }

    return moderator;
  });
}
