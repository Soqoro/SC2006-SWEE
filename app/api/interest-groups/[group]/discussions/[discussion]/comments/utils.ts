import { Sql } from "postgres";

/**
 * An discussion's comment.
 */
export interface DiscussionComment {
  /**
   * The comment ID.
   */
  id: string;
  /**
   * The creator's ID.
   */
  creatorID: string;
  /**
   * The creator's name.
   */
  creatorName: string;
  /**
   * The content.
   */
  content: string;
  /**
   * The number of likes.
   */
  likes: number;
  /**
   * Whether the comment has been liked by the current user.
   */
  liked: boolean;
}

/**
 * Returns the discussions on the give page.
 *
 * @param sql the database.
 * @param user the user.
 * @param discussion the discussion's ID.
 * @param page the comments' page.
 * @return the comments.
 */
export async function queryComments(
  sql: Sql,
  user: string,
  discussion: string,
  page: number,
): Promise<DiscussionComment[]> {
  return (
    await sql`
    SELECT
      user_group_discussion_comment.id,
      user_group_discussion_comment.content,
      user_group_discussion_comment.creator_id,
      MIN(user_profile.name) as creator_name,
      COUNT(user_group_discussion_comment_like.liker_id) AS likes,
      CASE WHEN MAX(user_group_discussion_comment_like.liker_id) = ${user} THEN TRUE ELSE FALSE END AS liked
    FROM user_group_discussion_comment
      LEFT JOIN user_profile ON user_group_discussion_comment.creator_id = user_profile.id
      LEFT JOIN user_group_discussion_comment_like ON user_group_discussion_comment.id = user_group_discussion_comment_like.comment_id
    WHERE user_group_discussion_comment.id IN (
      SELECT id
      FROM user_group_discussion_comment
      WHERE discussion_id = ${discussion}
      ORDER BY created_at DESC
      LIMIT 10 OFFSET ${(page - 1) * 10}
    )
    GROUP BY user_group_discussion_comment.id ORDER BY MIN(user_group_discussion_comment.created_at) DESC
  `
  ).map((row) => {
    return {
      id: row["id"],
      creatorID: row["creator_id"],
      creatorName: row["creator_name"],
      content: row["content"],
      likes: parseInt(row["likes"] as string),
      liked: row["liked"],
    };
  });
}

/**
 * Creates the given discussion if it does not exist.
 *
 * @param sql the database.
 * @param user the user.
 * @param group the group.
 * @param discussion the discussion.
 * @param comment the comment.
 * @return true if the discussion was created.
 */
export async function createComment(
  sql: Sql,
  user: string,
  group: string,
  discussion: string,
  comment: DiscussionComment,
): Promise<boolean> {
  return await sql.begin(async (sql) => {
    const [{ allowed }]: [{ allowed: boolean }] = await sql`
      SELECT CASE WHEN
        EXISTS (
          SELECT * FROM user_group_user_profile 
            WHERE user_id = ${user} AND group_id = ${group} AND (role = 'member' OR role = 'moderator')
        ) AND EXISTS (
          SELECT * FROM user_group_discussion WHERE id = ${discussion}
        ) AND NOT EXISTS (
          SELECT * FROM user_group_discussion_comment WHERE id = ${comment.id}
        ) THEN TRUE
        ELSE FALSE
      END AS allowed
    `;

    if (allowed) {
      await sql`
          INSERT INTO user_group_discussion_comment (id, discussion_id, content, creator_id, created_at)
          VALUES (${comment.id}, ${discussion}, ${comment.content}, ${user}, LOCALTIMESTAMP)
      `;
    }

    return allowed;
  });
}
