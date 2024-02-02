import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

test("renders content", () => {
  // define the test and its desc
  const blog = {
    // define the parameters that we'll use into a note
    title: "Component testing is done with react-testing-library",
    author: "test",
    url: "www.test.com",
  };

  render(<Blog blog={blog} />); // render the created note
  // search and check if an element with the specified text exist on screen
  const title = screen.getByText(
    "Component testing is done with react-testing-library",
  );
  const author = screen.queryByText("test");
  const url = screen.queryByText("www.test.com");
  expect(title).toBeInTheDocument();
  expect(author).not.toBeInTheDocument();
  expect(url).not.toBeInTheDocument();
});
