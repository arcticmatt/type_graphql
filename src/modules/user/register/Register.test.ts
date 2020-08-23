import { Connection } from "typeorm";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { redis } from "../../../../src/redis";

let conn: Connection;
beforeAll(async () => {
  if (redis.status == "end") {
    await redis.connect();
  }

  conn = await testConn();
});
afterAll(async () => {
  redis.disconnect();

  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register", () => {
  it("create user", async () => {
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: "bob",
            lastName: "bob2",
            email: "bob@bob.com",
            password: "asdfasdf",
          },
        },
      })
    );
  });
});
