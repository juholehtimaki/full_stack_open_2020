const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  let blogWithMostLikes;
  for (let blog of blogs) {
    if (!blogWithMostLikes) blogWithMostLikes = blog;
    else if (blog.likes > blogWithMostLikes.likes) blogWithMostLikes = blog;
  }
  return blogWithMostLikes;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  let authorsAndTheirLikes = {};
  for (let blog of blogs) {
    if (!authorsAndTheirLikes[blog.author])
      authorsAndTheirLikes[blog.author] = 1;
    else authorsAndTheirLikes[blog.author] += 1;
  }
  let mostPopularBlogger;
  for (let key in authorsAndTheirLikes) {
    if (!mostPopularBlogger)
      mostPopularBlogger = { author: key, blogs: authorsAndTheirLikes[key] };
    else if (authorsAndTheirLikes[key] > mostPopularBlogger.blogs)
      mostPopularBlogger = { author: key, blogs: authorsAndTheirLikes[key] };
  }
  return mostPopularBlogger;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  let authorsAndTheirLikes = {};
  for (let blog of blogs) {
    if (!authorsAndTheirLikes[blog.author])
      authorsAndTheirLikes[blog.author] = blog.likes;
    else authorsAndTheirLikes[blog.author] += blog.likes;
  }
  let mostPopularBlogger;
  for (let key in authorsAndTheirLikes) {
    if (!mostPopularBlogger)
      mostPopularBlogger = { author: key, likes: authorsAndTheirLikes[key] };
    else if (authorsAndTheirLikes[key] > mostPopularBlogger.likes)
      mostPopularBlogger = { author: key, likes: authorsAndTheirLikes[key] };
  }
  return mostPopularBlogger;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
