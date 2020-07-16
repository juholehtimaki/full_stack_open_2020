const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);

const validUser = {
  username: "ASD",
  name: "plz",
  password: "asd12345",
};

const invalidUser = {
  name: "plz",
  password: "asd12345",
};

describe("users can be added through /api/users route", () => {
  test("with valid user information", async () => {
    await api.post("/api/users").send(validUser).expect(201);
  });
  test("with invalid user information", async () => {
    await api.post("/api/users").send(invalidUser).expect(400);
  });
  test("two users with same username cannot exist", async () => {
    await api.post("/api/users").send(validUser).expect(201);
    await api.post("/api/users").send(validUser).expect(400);
  });
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
