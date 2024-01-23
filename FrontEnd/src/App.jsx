import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (!user) {
    return (
      <div>
        <h2>Login to the application</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Prevents the default form submission behavior
            console.log("Submit");
            loginService.login({ username, password });
          }}
        >
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
      <h2>blogss</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
