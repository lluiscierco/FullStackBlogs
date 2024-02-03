import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlog from "../components/NewBlog";

describe("<New Blog >", () => {
  let mockHandler;

  beforeEach(() => {
    // define the test and its desc
    mockHandler = jest.fn();
    render(<NewBlog handleBlogSubmit={mockHandler} />);
  });

  test("Create new Blog", async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByLabelText("Title:");
    const authorInput = screen.getByLabelText("Author:");
    const urlInput = screen.getByLabelText("Url:");
    const buttonPost = screen.getByText("Post");

    await userEvent.type(titleInput, "Title Test");
    await userEvent.type(authorInput, "Author Test");
    await userEvent.type(urlInput, "Url Test");

    await user.click(buttonPost);

    //expect(mockHandler.mock.calls).toHaveLength(1);
    // Ensure the correct props are passed to the event handler
    expect(mockHandler).toHaveBeenCalledWith({
      title: "Title Test",
      author: "Author Test",
      url: "Url Test",
    });
  });
});
