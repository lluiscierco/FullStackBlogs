import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  // Use Effects
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    console.log("log user:", loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      //noteService.setToken(user.token)
    }
  }, []);

  // Functions
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    console.log("Submit");
    const userAuth = await loginService.login({ username, password });
    setUser(userAuth);
    blogService.setToken(userAuth.token);
    window.localStorage.setItem("loggedUser", JSON.stringify(userAuth));
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    console.log("tring to post:", { title, author, url });
    try {
      await blogService.postBlog({ title, author, url });
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
      // Optionally, you can clear the input fields here if needed.
    } catch (error) {
      // Handle error if needed
    }
  };

  // Render
  console.log(user);
  if (!user) {
    return (
      <div>
        <h2>Login to the application</h2>
        <form onSubmit={handleLogin}>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="Submit">Log In</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <p> The user logged is: {user.name} </p>
      <button
        onClick={() => {
          window.localStorage.removeItem("loggedUser");
          setUser("");
        }}
      >
        Log Out
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
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

export default App;
