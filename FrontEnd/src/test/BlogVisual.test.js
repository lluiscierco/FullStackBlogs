import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("<Blog />", () => {
  let container;

  beforeEach(() => {
    // define the test and its desc
    const blog = {
      // define the parameters that we'll use into a note
      title: "Component testing is done with react-testing-library",
      author: "test",
      url: "www.test.com",
    };
    container = render(<Blog blog={blog} />).container;
  });

  test("renders content", () => {
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

  test("renders button toggles content", async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();
    const button = screen.getByText("Show more...");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);

    const author = screen.queryByText("test");
    const url = screen.queryByText("www.test.com");
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  });
});
