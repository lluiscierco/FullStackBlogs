import { useState } from "react";
const NewBlog = ({ handleBlogSubmit }) => {
  // States
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  // Functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleBlogSubmit({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
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
