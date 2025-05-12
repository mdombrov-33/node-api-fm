import * as user from "../users";

describe("user handler", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        username: "hello",
        password: "world",
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    const newUser = await user.createUser(req, res, () => {});
  });
});
