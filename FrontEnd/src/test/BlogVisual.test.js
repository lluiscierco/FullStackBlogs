import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import NewBlog from "../components/NewBlog";

describe("<Blog />", () => {
  let mockHandler;

  beforeEach(() => {
    // define the test and its desc
    mockHandler = jest.fn();
    const blog = {
      // define the parameters that we'll use into a note
      title: "Component testing is done with react-testing-library",
      author: "test",
      url: "www.test.com",
      user: { username: "testUser" },
    };
    render(<Blog blog={blog} addLike={mockHandler} />);
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
    const user = userEvent.setup();
    const button = screen.getByText("Show more...");
    await user.click(button);

    //expect(mockHandler.mock.calls).toHaveLength(1);
    const title = screen.getByText(
      "Component testing is done with react-testing-library",
    );
    const author = screen.queryByText("test");
    const url = screen.queryByText("www.test.com");
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  });

  test("Ckecks like functionality", async () => {
    //const mockHandler = jest.fn();
    const user = userEvent.setup();
    const buttonShowMore = screen.getByText("Show more...");
    await user.click(buttonShowMore);
    const buttonLike = screen.getByText("Like");
    await user.click(buttonLike);
    await user.click(buttonLike);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
