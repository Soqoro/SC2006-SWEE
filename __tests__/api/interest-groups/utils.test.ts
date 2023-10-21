import {TestDatabase} from "@/__tests__/api/database";
import {createInterestGroup, InterestGroupInformation, queryInterestGroups} from "@/app/api/interest-groups/utils";
import { v4 as uuidv4 } from 'uuid';

describe("queryInterestGroups", () => {
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

  test("no interest groups", async () => {
    expect(await queryInterestGroups(database.client, 1)).toEqual([]);
  });

  test("interest groups are descending", async () => {
    const a = uuidv4();
    await database.client`
      INSERT INTO user_group (id, name, description, image, created_at)
        VALUES (gen_random_uuid(), 'B', 'B description', 'B image', '2023-10-20 12:30:00'), 
               (gen_random_uuid(), 'C', 'C description', 'C image', '2023-10-20 13:30:00'), 
               (${a}, 'A', 'A description', 'A image', '2023-10-20 11:30:00')
    `;

    await database.client`
      INSERT INTO user_group_user_profile (group_id, user_id, role)
        VALUES (${a}, ${TestDatabase.userA.id}, 'moderator'), (${a}, ${TestDatabase.userB.id}, 'member')
    `;

    expect(await queryInterestGroups(database.client, 1)).toEqual([
      expect.objectContaining({
        name: "C",
        description: "C description",
        image: "C image",
        members: "0",
      }),
      expect.objectContaining({
        name: "B",
        description: "B description",
        image: "B image",
        members: "0",
      }),
      expect.objectContaining({
        name: "A",
        description: "A description",
        image: "A image",
        members: "2",
      }),
    ]);
  });

  test("offset after all", async () => {
    await database.client`
      INSERT INTO user_group (id, name, description, image, created_at)
        VALUES (gen_random_uuid(), 'B', 'B description', 'B image', '2023-10-20 12:30:00'),
               (gen_random_uuid(), 'C', 'C description', 'C image', '2023-10-20 13:30:00')
    `;

    expect(await queryInterestGroups(database.client, 2)).toEqual([]);
  });
});

describe("createInterestGroup", () => {
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

  test("does not exist", async () => {
    const group: InterestGroupInformation = {
      id: uuidv4(),
      name: "a name",
      description: "a description",
      image: "a image",
    };

    expect(await createInterestGroup(database.client, TestDatabase.userA.id, group)).toEqual(true);
    expect(await queryInterestGroups(database.client, 1)).toEqual([
      expect.objectContaining({
        ...group,
        members: "1",
      })
    ]);

    const [{role}]: [{role: string}] = await database.client`
      SELECT role FROM user_group_user_profile WHERE user_id = ${TestDatabase.userA.id}
    `;

    expect(role).toBe("moderator");
  });

  test("exists", async () => {
    const group: InterestGroupInformation = {
      id: uuidv4(),
      name: "a name",
      description: "a description",
      image: "a image",
    };

    expect(await createInterestGroup(database.client, TestDatabase.userA.id, group)).toEqual(true);
    expect(await createInterestGroup(database.client, TestDatabase.userB.id, group)).toEqual(false);
    expect(await queryInterestGroups(database.client, 1)).toEqual([
      expect.objectContaining({
        ...group,
        members: "1",
      })
    ]);

    const [{role: roleA}]: [{role: string}] = await database.client`
      SELECT role FROM user_group_user_profile WHERE user_id = ${TestDatabase.userA.id}
    `;

    expect(roleA).toBe("moderator");

    expect((await database.client`
      SELECT role FROM user_group_user_profile WHERE user_id = ${TestDatabase.userB.id}
    `).length).toBe(0);
  });
});
