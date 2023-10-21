import { Sql } from "postgres";

/**
 * A book's information, retrieved from the NLB API.
 */
export interface NLBBook {
  /**
   * The book's NLB internal Book Registration Number (BRN).
   */
  brn: string;
  /**
   * The title.
   */
  title: string;
  /**
   * The author.
   */
  author: string;
  /**
   * The subjects.
   */
  subjects: string[];
  /**
   * The ISBNs. Each ISBN may either be 10-digit or 13-digit. May be empty.
   */
  isbns: string[];
}

/**
 * Returns the given book's information from the NLB API.
 *
 * @param brn the book's Book Registration Number (BRN).
 * @returns the information, or null if the book could not be found.
 */
export async function nlb(brn: string): Promise<NLBBook | null> {
  const url = "https://openweb.nlb.gov.sg/api/v1/Catalogue/GetTitleDetails";
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env["NLB_API_KEY"]!,
      "X-App-Code": process.env["NLB_APP_CODE"]!,
      "User-Agent": "CoverQuest/1.0.0",
    },
  };

  const response = await fetch(url + `?brn=${brn}`, init);
  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  return {
    // eslint-disable-next-line
    brn: json["brn"].toString(),
    title: json["title"],
    author: json["author"],
    isbns: json["isbns"],
    subjects: json["subjects"],
  };
}

/**
 * A book's information, retrieved from the OpenLibrary API.
 */
export interface OpenLibraryBook {
  /**
   * The link to the book's cover image. The image is transparent if the book could not be found.
   */
  cover: string;
  /**
   * The book's description, null if no description is provided.
   */
  description: string | null;
}

/**
 * Returns the given book's information from the OpenLibrary API.
 *
 * @param isbn the book's 10-digit or 13-digit ISBN.
 * @returns the information.
 */
export async function openLibrary(isbn: string): Promise<OpenLibraryBook> {
  let description: string | null = null;

  const response = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`,
  );
  if (response.ok) {
    const json = await response.json();
    if ("details" in json && "description" in json["details"]) {
      description = json["details"]["description"];
    }
  }

  return {
    cover: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
    description: description,
  };
}

/**
 * The information about how a user interacts with a book.
 */
export interface UserBookInformation {
  /**
   * True if the user has favorited the book.
   */
  favorite: boolean;
  /**
   * The aggregated book rating across all users that rated the book.
   *
   * The rating is a non-negative double between 0 and 5, inclusive.
   */
  aggregatedRating: number;
  /**
   * The user's book rating, or null if the user did not rate the book.
   *
   * The rating is a non-negative double between 0 and 5, inclusive.
   */
  rating: number | null;
}

/**
 * Returns the given book's user information.
 *
 * @param sql the database.
 * @param brn the book's Book Registration Number (BRN).
 * @param user the user's ID.
 * @returns the information.
 */
export async function userBookInformation(
  sql: Sql,
  brn: string,
  user: string,
): Promise<UserBookInformation> {
  return sql.begin(async (sql) => {
    const [favorite]: [{ favorite: number }?] = await sql`
      SELECT COUNT(*) AS favorite FROM user_profile WHERE id = ${user} AND ${brn} = ANY(favorite_book_brns)
    `;

    const [aggregatedRating]: [{ rating: number }?] = await sql`
      SELECT AVG(rating) AS rating FROM book_rating WHERE brn = ${brn}
    `;

    const [rating]: [{ rating: number }?] = await sql`
      SELECT rating FROM book_rating WHERE user_id = ${user} LIMIT 1
    `;

    return {
      favorite: favorite?.favorite == 1,
      aggregatedRating: aggregatedRating?.rating ?? 0,
      rating: rating?.rating ?? null,
    };
  });
}

/**
 * A comment on a book.
 */
export interface BookComment {
  /**
   * The commenter's name.
   */
  name: string;
  /**
   * The content.
   */
  content: string;
}

/**
 * Returns a book's comments.
 *
 * @param sql the database
 * @param brn the book's Book Registration Number (BRN).
 * @param page the comments' page.
 * @return the comments.
 */
export async function comments(
  sql: Sql,
  brn: string,
  page: number,
): Promise<BookComment[]> {
  return sql<BookComment[]>`
    SELECT * FROM book_comment JOIN user_profile ON book_comment.user_id = user_profile.id 
      WHERE brn = ${brn} ORDER BY created_at DESC LIMIT 10 OFFSET ${
        (page - 1) * 10
      }
  `;
}
