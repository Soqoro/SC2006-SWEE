/**
 * A book's information, retrieved from the NLB API.
 */
export interface Book {
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
  /**
   * The book cover.
   */
  cover: string;
}

/**
 * Returns the book's information from the NLB API and their respective cover images.
 *
 * @returns up to 20 books.
 */
export async function queryNLB(): Promise<Book[]> {
  // We cannot paginate this NLB endpoint. The endpoint is terribly designed and tested. Setting the SetId to anything other
  // than 0 causes an internal server error.
  const url = `https://openweb.nlb.gov.sg/api/v1/Catalogue/SearchTitles?Subject=adult&PublishYear=2012`;
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env["NLB_API_KEY"]!,
      "X-App-Code": process.env["NLB_APP_CODE"]!,
      "User-Agent": "CoverQuest/1.0.0",
    },
  };

  const response = await fetch(url, init);
  if (!response.ok) {
    return [];
  }

  const json = await response.json();
  if (!("titles" in json)) {
    return [];
  }

  // eslint-disable-next-line
  return (json['titles'] as any[]).map<Book>(book => {
    return {
      // eslint-disable-next-line
      brn: book["brn"].toString(),
      title: book["title"],
      author: book["author"],
      isbns: book["isbns"],
      subjects: book["subjects"],
      cover: `https://covers.openlibrary.org/b/isbn/${book["isbns"][0]}-L.jpg`
    }
  });
}