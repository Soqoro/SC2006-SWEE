import { Sql } from "postgres";

/**
 * An overview of an interest group.
 */
export interface DiscussionOverview {
  /**
   * The interest group's ID.
   */
  id: string;
  /**
   * The name.
   */
  name: string;
  /**
   * The number of comments.
   *
   * It is a string instead of a number due to https://github.com/porsager/postgres#numbers-bigint-numeric.
   */
  comments: string;
}

/**
 * Returns the discussions on the give page.
 *
 * @param sql the database.
 * @param group the interest group ID.
 * @param page the comments' page.
 * @return the comments.
 */
export async function queryDiscussions(
  sql: Sql,
  group: string,
  page: number,
): Promise<DiscussionOverview[]> {
  return sql`
    SELECT user_group_discussion.id, user_group_discussion.name, COUNT(user_group_discussion_comment.id) AS comments
      FROM user_group_discussion
         LEFT JOIN user_group_discussion_comment ON user_group_discussion.id = user_group_discussion_comment.discussion_id
      WHERE user_group_discussion.id IN (
        SELECT id
          FROM user_group_discussion
          WHERE user_group_discussion.group_id = ${group}
          ORDER BY created_at DESC
          LIMIT 10 OFFSET ${(page - 1) * 10}
      )
    GROUP BY user_group_discussion.id ORDER BY MIN(user_group_discussion.created_at) DESC;
  `;
}

/**
 * Creates the given discussion if it does not exist.
 *
 * @param sql the database
 * @param user the user
 * @param group the group
 * @param discussion the discussion
 * @return true if the discussion was created.
 */
export async function createDiscussion(
  sql: Sql,
  user: string,
  group: string,
  discussion: DiscussionOverview,
): Promise<boolean> {
  return await sql.begin(async (sql) => {
    const [{ allowed }]: [{ allowed: boolean }] = await sql`
      SELECT CASE WHEN
        EXISTS (
          SELECT * FROM user_group_user_profile
          WHERE user_id = ${user} AND group_id = ${group} AND (role = 'member' OR role = 'moderator')
        ) AND NOT EXISTS (
        SELECT * FROM user_group_discussion WHERE id = ${discussion.id}
      ) THEN TRUE
      ELSE FALSE
     END AS allowed
    `;

    if (allowed) {
      await sql`
          INSERT INTO user_group_discussion (id, group_id, name, creator_id, created_at)
          VALUES (${discussion.id}, ${group}, ${discussion.name}, ${user}, LOCALTIMESTAMP)
      `;
    }

    return allowed;
  });
}
