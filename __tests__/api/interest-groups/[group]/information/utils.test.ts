import { TestDatabase } from "@/__tests__/api/database";
import {
  createInterestGroup,
  InterestGroupInformation,
  queryInterestGroups,
} from "@/app/api/interest-groups/utils";
import { v4 as uuidv4 } from "uuid";
import { updateInterestGroupInformation } from "@/app/api/interest-groups/[group]/information/utils";

describe("updateInterestGroupInformation", () => {
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

    expect(
      await updateInterestGroupInformation(
        database.client,
        TestDatabase.userA.id,
        group.id,
        group,
      ),
    ).toEqual(false);

    expect((await database.client`SELECT * FROM user_group`).length).toEqual(0);
    expect(
      (await database.client` SELECT * FROM user_group_user_profile`).length,
    ).toEqual(0);
  });

  test("exists", async () => {
    const original: InterestGroupInformation = {
      id: uuidv4(),
      name: "a name",
      description: "a description",
      image: "a image",
    };

    const mutated = {
      id: original.id,
      name: "a mutated name",
      description: "a mutated description",
      image: "a mutated image",
    };

    expect(
      await createInterestGroup(
        database.client,
        TestDatabase.userA.id,
        original,
      ),
    ).toEqual(true);
    expect(
      await updateInterestGroupInformation(
        database.client,
        TestDatabase.userA.id,
        mutated.id,
        mutated,
      ),
    ).toEqual(true);
    expect(await queryInterestGroups(database.client, 1)).toEqual([
      expect.objectContaining({
        ...mutated,
        members: "1",
      }),
    ]);
  });

  test("invalid role", async () => {
    const original: InterestGroupInformation = {
      id: uuidv4(),
      name: "a name",
      description: "a description",
      image: "a image",
    };

    const mutated = {
      id: original.id,
      name: "a mutated name",
      description: "a mutated description",
      image: "a mutated image",
    };

    expect(
      await createInterestGroup(
        database.client,
        TestDatabase.userA.id,
        original,
      ),
    ).toEqual(true);

    await database.client`
      INSERT INTO user_group_user_profile (group_id, user_id, role)
        VALUES (${original.id}, ${TestDatabase.userB.id}, 'member')
    `;

    expect(
      await updateInterestGroupInformation(
        database.client,
        TestDatabase.userB.id,
        mutated.id,
        mutated,
      ),
    ).toEqual(false);
    expect(await queryInterestGroups(database.client, 1)).toEqual([
      expect.objectContaining({
        ...original,
        members: "2",
      }),
    ]);
  });
});
