import { TestDatabase } from "@/__tests__/api/database";
import {
  createInterestGroup,
  InterestGroupInformation,
  queryInterestGroups,
} from "@/app/api/interest-groups/utils";
import { v4 as uuidv4 } from "uuid";
import {
  createDiscussion,
  DiscussionOverview,
  queryDiscussions,
} from "@/app/api/interest-groups/[group]/discussions/utils";

describe("discussions", () => {
  jest.setTimeout(60000);

  let database = new TestDatabase();
  const group: InterestGroupInformation = {
    id: uuidv4(),
    name: "a name",
    description: "a description",
    image: "a image",
  };
  const discussion: DiscussionOverview = {
    id: uuidv4(),
    name: "Hi",
    comments: "0",
  };

  beforeAll(async () => {
    await database.beforeAll();
  });

  beforeEach(async () => {
    await database.beforeEach();
  });

  afterAll(async () => {
    await database.afterAll();
  });

  test("no discussions", async () => {
    await createInterestGroup(database.client, TestDatabase.userA.id, group);
    expect(await queryDiscussions(database.client, group.id, 1)).toEqual([]);
  });

  test("discussions are descending", async () => {
    const otherGroup = {
      id: uuidv4(),
      name: "b name",
      description: "b description",
      image: "b image",
    };

    const otherDiscussion: DiscussionOverview = {
      id: uuidv4(),
      name: "there",
      comments: "0",
    };

    await createInterestGroup(database.client, TestDatabase.userA.id, group);
    await createInterestGroup(
      database.client,
      TestDatabase.userA.id,
      otherGroup,
    );

    expect(
      await createDiscussion(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussion,
      ),
    ).toEqual(true);
    expect(
      await createDiscussion(
        database.client,
        TestDatabase.userA.id,
        group.id,
        otherDiscussion,
      ),
    ).toEqual(true);

    expect(await queryDiscussions(database.client, group.id, 1)).toEqual([
      expect.objectContaining(otherDiscussion),
      expect.objectContaining(discussion),
    ]);
  });

  test("offset after all", async () => {
    await createInterestGroup(database.client, TestDatabase.userA.id, group);
    await createDiscussion(
      database.client,
      TestDatabase.userA.id,
      group.id,
      discussion,
    );
    expect(await queryDiscussions(database.client, group.id, 2)).toEqual([]);
  });

  test("discussion already exists", async () => {
    const otherDiscussion: DiscussionOverview = {
      id: discussion.id,
      name: "there",
      comments: "0",
    };

    await createInterestGroup(database.client, TestDatabase.userA.id, group);
    expect(
      await createDiscussion(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussion,
      ),
    ).toEqual(true);
    expect(
      await createDiscussion(
        database.client,
        TestDatabase.userA.id,
        group.id,
        otherDiscussion,
      ),
    ).toEqual(false);
    expect(await queryDiscussions(database.client, group.id, 1)).toEqual([
      expect.objectContaining(discussion),
    ]);
  });

  test("no permission", async () => {
    const otherDiscussion: DiscussionOverview = {
      id: uuidv4(),
      name: "there",
      comments: "0",
    };

    await createInterestGroup(database.client, TestDatabase.userA.id, group);
    expect(
      await createDiscussion(
        database.client,
        TestDatabase.userB.id,
        group.id,
        discussion,
      ),
    ).toEqual(false);
    expect(await queryDiscussions(database.client, group.id, 1)).toEqual([]);
  });
});
