import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState("");

  // Use Effects
  useEffect(() => {
    // Use effects cant have the async, the async must be in a func inside the use effect but not itself
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll();
      // Sort the blogs by likes in descending order
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
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
    try {
      const userAuth = await loginService.login({ username, password });
      setUser(userAuth);
      blogService.setToken(userAuth.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(userAuth));
      showNotification("User logged in successfuly", true);
      setUsername("");
    } catch {
      showNotification("User credentials incorrect", false);
    }
    setPassword("");
  };

  const handleBlogSubmit = async ({ title, author, url }) => {
    //event.preventDefault();
    console.log("tring to post:", { title, author, url });
    try {
      await blogService.postBlog({ title, author, url });
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      showNotification("Blog added successfully!", true);
    } catch (error) {
      showNotification("Blog is missing information", false);
    }
  };

  const addLike = async (likedBlog) => {
    try {
      likedBlog.likes = likedBlog.likes + 1;
      await blogService.addLike(likedBlog);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      showNotification("Blog liked successfully!", true);
    } catch (error) {
      showNotification("Ups! Something went wrong... try again later", false);
    }
  };

  const deleteBlog = async (blogToDelete) => {
    if (
      window.confirm("Are you sure you want to permanently delete the blog?")
    ) {
      try {
        await blogService.deleteBlog(blogToDelete);
        const updatedBlogs = await blogService.getAll();
        setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
        showNotification("Blog deleted successfully!", true);
      } catch (error) {
        showNotification("Ups! Something went wrong... try again later", false);
      }
    }
  };

  const showNotification = (message, isSuccess = true) => {
    setNotification({ message, isSuccess });
    setTimeout(() => {
      setNotification(null);
    }, 5000); // Clear the notification after 5 seconds
  };

  // Render
  if (!user) {
    return (
      <div>
        {notification && (
          <div
            style={{
              backgroundColor: notification.isSuccess ? "green" : "red",
              padding: "10px",
              color: "white",
            }}
          >
            {notification.message}
          </div>
        )}
        <h2>Login to the application</h2>
        <form onSubmit={handleLogin}>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
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
      {notification && (
        <div
          style={{
            backgroundColor: notification.isSuccess ? "green" : "red",
            padding: "10px",
            color: "white",
          }}
        >
          {notification.message}
        </div>
      )}
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
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          deleteBlog={deleteBlog}
        />
      ))}
      <Togglable buttonShowLabel="Create new blog" buttonHideLabel="Cancel">
        <NewBlog handleBlogSubmit={handleBlogSubmit} />
      </Togglable>
    </div>
  );
};

export default App;
