import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import postgres, { Sql } from "postgres";

export class TestDatabase {
  static readonly userA = {
    id: "A",
    name: "A User",
  };

  static readonly userB = {
    id: "B",
    name: "B User",
  };

  client: Sql = postgres(
    "postgres://local-username:password@localhost:5432/coverquest",
    {
      types: {
        number: postgres.BigInt,
      },
    },
  );
  private container: StartedPostgreSqlContainer | null = null;

  async beforeAll() {
    this.container = await new PostgreSqlContainer().start();
    this.client = postgres(this.container.getConnectionUri());
    // @ts-ignore
    await this.client.file("./migrations/V1__Initial.sql").simple();
  }

  async beforeEach() {
    const deletions = this.client`
      DELETE FROM user_profile;
      DELETE FROM user_profile_user_profile;
      DELETE FROM book_rating;
      DELETE FROM book_comment;
      DELETE FROM user_group;
      DELETE FROM user_group_user_profile;
      DELETE FROM user_group_discussion;
      DELETE FROM user_group_discussion_comment;
      DELETE FROM user_group_discussion_comment_like;
    `;

    // @ts-ignore
    await deletions.simple();

    const insertions = this.client`
      INSERT INTO user_profile (id, name) VALUES ('A', 'A User');
      INSERT INTO user_profile (id, name) VALUES ('B', 'B User');
    `;

    // @ts-ignore
    await insertions.simple();
  }
  async afterAll() {
    await this.container!.stop();
  }
}
