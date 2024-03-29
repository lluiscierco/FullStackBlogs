import { useState } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, addLike, deleteBlog }) => {
  // State variables
  const [visible, setVisible] = useState(false);

  // Variables
  const containerStyle = {
    border: "2px solid #333", // Solid border with color #333
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Shadow effect
    padding: "5px", // Adjust padding according to your preference
  };
  const buttonStyle = {
    background: "rgba(255, 99, 71, 0.8)", // Tomato color with reduced transparency
    color: "#fff", // White text color
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "3px",
    fontSize: "12px",
    padding: "4px 6px", // Increased padding for a more comfortable click area
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Slight shadow effect
  };

  // Functions
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (event) => {
    event.preventDefault();
    addLike(blog);
  };

  const handleRemove = (event) => {
    event.preventDefault();
    deleteBlog(blog);
  };

  // Render
  if (!visible) {
    return (
      <div style={containerStyle}>
        <div>{blog.title}</div>
        <button onClick={toggleVisibility} style={buttonStyle}>
          Show more...
        </button>
      </div>
    );
  } else {
    return (
      <div style={containerStyle}>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div>{blog.author}</div>
        <div>likes: {blog.likes}</div>
        <div>{blog.user.username}</div>
        <button onClick={handleLike}>Like</button>
        <button onClick={toggleVisibility} style={buttonStyle}>
          Hide
        </button>
        <button onClick={handleRemove} style={buttonStyle}>
          Remove
        </button>
      </div>
    );
  }
};

Blog.prototypes = {
  blog: PropTypes.string.isRequired,
};
export default Blog;
