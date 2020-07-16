const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const blog = require("../models/blog");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users.map((user) => user.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser.toJSON());
});

usersRouter.put("/", async (request, response) => {
  await User.deleteMany();
  await blog.deleteMany();
});

module.exports = usersRouter;
