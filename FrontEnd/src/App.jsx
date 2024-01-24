import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  // Use Effects
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //noteService.setToken(user.token)
    }
  }, []);

  // Functions
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    console.log("Submit");
    const userAuth = await loginService.login({ username, password });
    setUser(userAuth);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
  };

  // Render
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
    </div>
  );
};

export default App;
