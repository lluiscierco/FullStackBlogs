const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max > blog.likes ? max : blog.likes;
  };
  const maxLikes = blogs.reduce(reducer, -1);
  return blogs.length === 0
    ? {}
    : blogs.find((blog) => blog.likes === maxLikes);
};

// Export
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
