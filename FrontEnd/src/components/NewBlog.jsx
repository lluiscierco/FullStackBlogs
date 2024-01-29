import { useState } from "react";
const NewBlog = ({ handleBlogSubmit }) => {
  // States
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Author">Author: </label>
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Url">Url: </label>
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button type="Submit">Post</button>
      </form>
    </div>
  );
};

export default NewBlog;
