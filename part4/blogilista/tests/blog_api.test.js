const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);

const initialBlogs = [
  {
    title: "testing is rly important:D",
    author: "test author 1",
    url: "http://localhost:3001/",
    likes: 1,
  },
  {
    title: "another rly important blog about testing:D",
    author: "test author 2",
    url: "http://localhost:3001/",
    likes: 2,
  },
];

const newBlog = {
  title: "here we go again:D",
  author: "test author 3",
  url: "http://localhost:3001/",
  likes: 3,
};

const newBlogWithoutLikes = {
  title: "yet again:D",
  author: "test author 4",
  url: "http://localhost:3001/",
};

const newBlogWithoutUrlAndTitle = {
  author: "test author 5",
  likes: 4,
};

const testUser = {
  username: "testuser",
  name: "test user",
  password: "12345",
};

describe("blogs are returned correctly through /api/blogs route", () => {
  test("format is json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct amount is being returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("blog contains id field as identifier", async () => {
    const response = await api.get("/api/blogs");
    for (let blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe("new blogs are posted correctly through /api/blogs route", () => {
  test("new blog is correctly added to the database", async () => {
    const token = await createUserAndGetJWT();
    const initialResponse = await api.get("/api/blogs");
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + token)
      .expect(201);
    const responseAfterAdding = await api.get("/api/blogs");
    expect(responseAfterAdding.body).toHaveLength(
      initialResponse.body.length + 1
    );
  });
  test("likes are set to 0 if like field is missing", async () => {
    const token = await createUserAndGetJWT();
    await api
      .post("/api/blogs")
      .send(newBlogWithoutLikes)
      .set("Authorization", "Bearer " + token)
      .expect(201);
    const response = await api.get("/api/blogs");
    const latestBlog = response.body[response.body.length - 1];
    expect(latestBlog.likes).toBeDefined();
  });
  test("route gives status code 400 if url and author are missing", async () => {
    const token = await createUserAndGetJWT();
    await api
      .post("/api/blogs")
      .send(newBlogWithoutUrlAndTitle)
      .set("Authorization", "Bearer " + token)
      .expect(400);
  });
  test("route gives status code 401 if there's no jwt", async () => {
    await api.post("/api/blogs").send(newBlogWithoutUrlAndTitle).expect(401);
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  mongoose.connection.close();
});

const createUserAndGetJWT = async () => {
  await api.post("/api/users").send(testUser).expect(201);
  const response = await api.post("/api/login").send(testUser);
  return response.body.token;
};
