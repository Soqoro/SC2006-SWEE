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
import {
  createComment,
  DiscussionComment,
  queryComments,
} from "@/app/api/interest-groups/[group]/discussions/[discussion]/comments/utils";

describe("comments", () => {
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
    comments: "1",
  };
  const comment: DiscussionComment = {
    id: uuidv4(),
    content: "A comment",
    creatorID: "A",
    creatorName: "A User",
    likes: 0,
    liked: false,
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

  test("no comments", async () => {
    await createInterestGroup(database.client, TestDatabase.userA.id, group);
    await createDiscussion(
      database.client,
      TestDatabase.userA.id,
      group.id,
      discussion,
    );

    expect(
      await queryComments(
        database.client,
        TestDatabase.userA.id,
        discussion.id,
        1,
      ),
    ).toEqual([]);
  });

  test("comments are descending", async () => {
    const otherGroup = {
      id: uuidv4(),
      name: "b name",
      description: "b description",
      image: "b image",
    };
    const discussionInOtherGroup: DiscussionOverview = {
      id: uuidv4(),
      name: "discussion in other group",
      comments: "1",
    };
    const commentInOtherGroup: DiscussionComment = {
      id: uuidv4(),
      content: "comment in other group",
      creatorID: "A",
      creatorName: "A User",
      likes: 0,
      liked: false,
    };

    const discussionInSameGroup: DiscussionOverview = {
      id: uuidv4(),
      name: "other discussion",
      comments: "1",
    };
    const commentInOtherDiscussion: DiscussionComment = {
      id: uuidv4(),
      content: "comment in other discussion",
      creatorID: "A",
      creatorName: "A User",
      likes: 0,
      liked: false,
    };

    const otherComment: DiscussionComment = {
      id: uuidv4(),
      content: "comment in same discussion",
      creatorID: "B",
      creatorName: "B User",
      likes: 0,
      liked: false,
    };

    expect(
      await createInterestGroup(
        database.client,
        TestDatabase.userA.id,
        otherGroup,
      ),
    ).toEqual(true);
    expect(
      await createDiscussion(
        database.client,
        TestDatabase.userA.id,
        otherGroup.id,
        discussionInOtherGroup,
      ),
    ).toEqual(true);
    expect(
      await createComment(
        database.client,
        TestDatabase.userA.id,
        otherGroup.id,
        discussionInOtherGroup.id,
        commentInOtherGroup,
      ),
    ).toEqual(true);

    expect(
      await createInterestGroup(database.client, TestDatabase.userA.id, group),
    ).toEqual(true);
    await database.client`
      INSERT INTO user_group_user_profile (group_id, user_id, role) VALUES (${group.id}, ${TestDatabase.userB.id}, 'member')
    `;

    expect(
      await createDiscussion(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussionInSameGroup,
      ),
    ).toEqual(true);
    expect(
      await createComment(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussionInSameGroup.id,
        commentInOtherDiscussion,
      ),
    ).toEqual(true);

    expect(
      await createDiscussion(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussion,
      ),
    ).toEqual(true);
    expect(
      await createComment(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussion.id,
        comment,
      ),
    ).toEqual(true);
    expect(
      await createComment(
        database.client,
        TestDatabase.userB.id,
        group.id,
        discussion.id,
        otherComment,
      ),
    ).toEqual(true);

    expect(
      await queryComments(
        database.client,
        TestDatabase.userA.id,
        discussion.id,
        1,
      ),
    ).toEqual([
      expect.objectContaining(otherComment),
      expect.objectContaining(comment),
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

    expect(
      await createComment(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussion.id,
        comment,
      ),
    ).toEqual(true);
    expect(
      await queryComments(
        database.client,
        TestDatabase.userA.id,
        discussion.id,
        2,
      ),
    ).toEqual([]);
  });

  test("comment already exists", async () => {
    const otherComment: DiscussionComment = {
      id: comment.id,
      content: "comment in same discussion",
      creatorID: "B",
      creatorName: "B User",
      likes: 0,
      liked: false,
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
      await createComment(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussion.id,
        comment,
      ),
    ).toEqual(true);
    expect(
      await createComment(
        database.client,
        TestDatabase.userA.id,
        group.id,
        discussion.id,
        otherComment,
      ),
    ).toEqual(false);

    expect(
      await queryComments(
        database.client,
        TestDatabase.userA.id,
        discussion.id,
        1,
      ),
    ).toEqual([expect.objectContaining(comment)]);
  });

  test("no permission", async () => {
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
      await createComment(
        database.client,
        TestDatabase.userB.id,
        group.id,
        discussion.id,
        comment,
      ),
    ).toEqual(false);

    expect(
      await queryComments(
        database.client,
        TestDatabase.userA.id,
        discussion.id,
        1,
      ),
    ).toEqual([]);
  });
});
