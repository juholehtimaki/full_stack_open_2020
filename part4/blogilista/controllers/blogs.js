const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const randomUser = await User.findOne();
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!request.token)
    return response.status(401).json({ error: "token missing or invalid" });
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id)
    return response.status(401).json({ error: "token missing or invalid" });
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.token)
    return response.status(401).json({ error: "token missing or invalid" });
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id)
    return response.status(401).json({ error: "token missing or invalid" });
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === user.id) {
    blog.remove();
    response.status(204).end();
  } else {
    response.status(401).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
