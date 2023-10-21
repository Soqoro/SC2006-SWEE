import { Sql } from "postgres";

/**
 * An overview of an interest group.
 */
export interface InterestGroupOverview {
  /**
   * The interest group's ID.
   */
  id: string;
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
   *
   * {@see} https://stackoverflow.com/a/8499716/4189771 for converting a base64 string to an image.
   */
  image: string;
  /**
   * The number of members in the interest group.
   *
   * It is a string instead of a number due to https://github.com/porsager/postgres#numbers-bigint-numeric.
   */
  members: string;
}

/**
 * Returns the interest groups on the give page.
 *
 * @param sql the database
 * @param page the comments' page.
 * @return the comments.
 */
export async function queryInterestGroups(
  sql: Sql,
  page: number,
): Promise<InterestGroupOverview[]> {
  return sql`
    SELECT user_group.id, user_group.name, user_group.description, user_group.image, COUNT(user_group_user_profile.group_id) AS members
      FROM user_group
         LEFT JOIN user_group_user_profile ON user_group.id = user_group_user_profile.group_id
      WHERE user_group.id IN (
        SELECT id
        FROM user_group
        ORDER BY created_at DESC
        LIMIT 10 OFFSET ${(page - 1) * 10}
      )
      GROUP BY user_group.id ORDER BY MIN(user_group.created_at) DESC;
  `;
}

/**
 * An interest group's information.
 */
export interface InterestGroupInformation {
  /**
   * The interest group's ID.
   */
  id: string;
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
 * Creates the given interest group if it does not exists.
 *
 * @param sql the database
 * @param user the user
 * @param group the group
 * @return true if the interest group was updated.
 */
export async function createInterestGroup(
  sql: Sql,
  user: string,
  group: InterestGroupInformation,
): Promise<boolean> {
  return await sql.begin(async (sql) => {
    const [{ count }]: [{ count: number }] = await sql`
      SELECT COUNT(*) as count FROM user_group WHERE id = ${group.id};
    `;

    if (count == 0) {
      await sql`
          INSERT INTO user_group (id, name, description, image, created_at)
          VALUES (${group.id}, ${group.name}, ${group.description}, ${group.image}, LOCALTIMESTAMP)
      `;

      await sql`
        INSERT INTO user_group_user_profile (group_id, user_id, role) VALUES (${group.id}, ${user}, 'moderator')
      `;
    }

    return count == 0;
  });
}
