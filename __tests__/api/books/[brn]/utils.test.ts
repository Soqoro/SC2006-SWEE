import {
  queryComments,
  queryNLB,
  NLBBook,
  queryOpenLibrary,
  OpenLibraryBook,
  queryUserBookInformation,
} from "@/app/api/books/[brn]/utils";
import { TestDatabase } from "@/__tests__/api/database";

describe("queryNLB", () => {
  test("BRN does not exist", async () => {
    expect(await queryNLB("invalid")).toEqual(null);
  });

  test("BRN exists", async () => {
    expect(await queryNLB("205589543")).toEqual<NLBBook>({
      brn: "205589543",
      title: "Diary of a wimpy kid : big shot",
      author: "Kinney, Jeff",
      isbns: ["9780241454145 (hardcover)", "024145414X (hardcover)"],
      subjects: [
        "Heffley, Greg -- Juvenile fiction",
        "Diaries -- Juvenile fiction",
        "Competition -- Juvenile fiction",
        "Sports stories",
        "Children's stories",
        "Diaries",
        "Competition",
        "Schools",
        "Middle schools",
        "Basketball",
        "Basketball stories",
      ],
    });
  });
});

describe("queryOpenLibrary", () => {
  test("book does not exist", async () => {
    expect(await queryOpenLibrary("invalid")).toEqual<OpenLibraryBook>({
      cover: "https://covers.openlibrary.org/b/isbn/invalid-M.jpg",
      description: null,
    });
  });

  test("book exists with no description", async () => {
    expect(await queryOpenLibrary("024145414X")).toEqual<OpenLibraryBook>({
      cover: "https://covers.openlibrary.org/b/isbn/024145414X-M.jpg",
      description: null,
    });
  });

  test("book exists with description", async () => {
    expect(await queryOpenLibrary("9780980200447")).toEqual<OpenLibraryBook>({
      cover: "https://covers.openlibrary.org/b/isbn/9780980200447-M.jpg",
      description: null,
    });
  });
});

describe("queryUserBookInformation", () => {
  jest.setTimeout(60000);

  let database = new TestDatabase();

  beforeAll(async () => {
    await database.beforeAll();
  });

  beforeEach(async () => {
    await database.beforeEach();
  });

  afterAll(async () => {
    await database.afterAll();
  });

  test("book not favorited", async () => {
    await database.client`UPDATE user_profile SET favorite_book_brns = '{"024145414X"}' WHERE id = 'A'`;

    const information = await queryUserBookInformation(
      database.client,
      "9780980200447",
      TestDatabase.userA.id,
    );
    expect(information.favorite).toEqual(false);
  });

  test("book favorited", async () => {
    await database.client`UPDATE user_profile SET favorite_book_brns = '{"9780980200447"}' WHERE id = 'A'`;

    const information = await queryUserBookInformation(
      database.client,
      "9780980200447",
      TestDatabase.userA.id,
    );
    expect(information.favorite).toEqual(true);
  });

  test("has no aggregated rating", async () => {
    const information = await queryUserBookInformation(
      database.client,
      "9780980200447",
      TestDatabase.userA.id,
    );
    expect(information.aggregatedRating).toEqual(0);
  });

  test("has aggregated rating", async () => {
    await database.client`
      INSERT INTO book_rating (user_id, brn, rating, created_at) 
        VALUES ('A', '9780980200447', 1, '2023-10-20 12:30:00'), ('B', '9780980200447', 5, '2023-10-20 12:30:00')
    `;

    const information = await queryUserBookInformation(
      database.client,
      "9780980200447",
      TestDatabase.userA.id,
    );
    expect(information.aggregatedRating).toEqual(3);
  });

  test("has no rating", async () => {
    const information = await queryUserBookInformation(
      database.client,
      "9780980200447",
      TestDatabase.userA.id,
    );
    expect(information.rating).toEqual(null);
  });

  test("has rating", async () => {
    await database.client`
      INSERT INTO book_rating (user_id, brn, rating, created_at) 
        VALUES ('A', '9780980200447', 1, '2023-10-20 12:30:00'), ('B', '9780980200447', 5, '2023-10-20 12:30:00')
    `;

    const information = await queryUserBookInformation(
      database.client,
      "9780980200447",
      TestDatabase.userA.id,
    );
    expect(information.rating).toEqual(1);
  });
});

describe("queryComments", () => {
  jest.setTimeout(60000);

  let database = new TestDatabase();

  beforeAll(async () => {
    await database.beforeAll();
  });

  beforeEach(async () => {
    await database.beforeEach();
  });

  afterAll(async () => {
    await database.afterAll();
  });

  test("no comments", async () => {
    expect(await queryComments(database.client, "9780980200447", 1)).toEqual(
      [],
    );
  });

  test("comments are descending", async () => {
    await database.client`
      INSERT INTO book_comment (id, user_id, brn, content, created_at) 
        VALUES (gen_random_uuid(), 'A', '9780980200447', 'world', '2023-10-20 12:30:00'), 
               (gen_random_uuid(), 'A', '9780980200447', '!', '2023-10-20 13:30:00'), 
               (gen_random_uuid(), 'B', '9780980200447', 'hello', '2023-10-20 11:30:00')
    `;

    expect(await queryComments(database.client, "9780980200447", 1)).toEqual([
      expect.objectContaining({
        name: "A User",
        content: "!",
      }),
      expect.objectContaining({
        name: "A User",
        content: "world",
      }),
      expect.objectContaining({
        name: "B User",
        content: "hello",
      }),
    ]);
  });

  test("offset after all", async () => {
    await database.client`
      INSERT INTO book_comment (id, user_id, brn, content, created_at) 
        VALUES (gen_random_uuid(), 'A', '9780980200447', 'world', '2023-10-20 12:30:00'), 
               (gen_random_uuid(), 'A', '9780980200447', '!', '2023-10-20 13:30:00'), 
               (gen_random_uuid(), 'B', '9780980200447', 'hello', '2023-10-20 11:30:00')
    `;

    expect(await queryComments(database.client, "9780980200447", 2)).toEqual(
      [],
    );
  });
});
