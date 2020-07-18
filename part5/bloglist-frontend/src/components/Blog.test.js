import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "Component testing is done with react-testing-library",
  author: "test",
  likes: "5",
  url: "testurl",
  username: ":D",
  user: {
    username: "jeesus",
  },
};

const blogs = [
  {
    title: "Component testing is done with react-testing-library",
    author: "test",
    likes: "5",
    url: "testurl",
    username: ":D",
    user: {
      username: "jeesus",
    },
  },
];

describe("blog", () => {
  test("renders title and author by default", () => {
    let component = render(<Blog blog={blog} />);
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
  });
  test("url and likes are not shown by default", () => {
    let component = render(<Blog blog={blog} />);
    const url = component.container.querySelector(".url");
    expect(url).toBeNull();
    const likes = component.container.querySelector(".url");
    expect(likes).toBeNull();
  });
  test("url and likes are shown after clicking the view button", () => {
    let component = render(<Blog blog={blog} />);
    const button = component.getByText("view");
    fireEvent.click(button);
    expect(component.container).toHaveTextContent(blog.likes);
    expect(component.container).toHaveTextContent(blog.url);
  });
  test("pressing like button twice results in two calls", () => {
    let setBlogsMock = jest.fn();
    let component = render(
      <Blog blog={blog} blogs={blogs} handleLike={setBlogsMock} />
    );
    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(setBlogsMock.mock.calls).toHaveLength(2);
  });
});
