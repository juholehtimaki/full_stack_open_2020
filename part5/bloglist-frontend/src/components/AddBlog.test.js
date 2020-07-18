import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddBlog from "./AddBlog";
test("check that onSubmit function is being called", () => {
  const handleNewBlog = jest.fn();
  const component = render(
    <AddBlog
      handleNewBlog={handleNewBlog}
      blogs={[]}
      handleNotification={null}
    />
  );
  const newBlog = component.getByText("new blog");
  fireEvent.click(newBlog);
  const titleInput = component.container.querySelector("#title");
  const authorInput = component.container.querySelector("#author");
  const urlInput = component.container.querySelector("#url");
  const form = component.container.querySelector("form");
  fireEvent.change(titleInput, {
    target: { value: "so fun" },
  });
  fireEvent.change(authorInput, {
    target: { value: "to write" },
  });
  fireEvent.change(urlInput, {
    target: { value: "tests" },
  });
  fireEvent.submit(form);
  expect(handleNewBlog.mock.calls).toHaveLength(1);
  expect(handleNewBlog.mock.calls[0][0].title).toBe("so fun");
  expect(handleNewBlog.mock.calls[0][0].author).toBe("to write");
  expect(handleNewBlog.mock.calls[0][0].url).toBe("tests");
});
