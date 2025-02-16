const listHelper = require("../utils/list_helper");

const listWithMultipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const mostPopularBloggerOutOfMultipleOnes = {
  author: "Robert C. Martin",
  blogs: 3,
};

const mostPopularBloggerOutOfOne = {
  author: "Edsger W. Dijkstra",
  blogs: 1,
};

const bloggerWithMostLikesOutOfMultipleOnes = {
  author: "Edsger W. Dijkstra",
  likes: 17,
};

const bloggrWithMostLikesOutOfOne = {
  author: "Edsger W. Dijkstra",
  likes: 5,
};

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("of a bigger list calculated right", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(36);
  });
});

describe("blog with most likes", () => {
  test("when list has only one blog, it gets returned", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });
  test("if list is empty, return empty object", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });
  test("when given multiple blogs", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(result).toEqual(listWithMultipleBlogs[2]);
  });
});

describe("author with most blogs", () => {
  test("when given multiple blogs", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual(mostPopularBloggerOutOfMultipleOnes);
  });
  test("when given empty list", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });
  test("when given just one blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual(mostPopularBloggerOutOfOne);
  });
});

describe("author with most likes", () => {
  test("when given multiple blogs", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    expect(result).toEqual(bloggerWithMostLikesOutOfMultipleOnes);
  });
  test("when given empty ist", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual({});
  });
  test("when given just one blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual(bloggrWithMostLikesOutOfOne);
  });
});
