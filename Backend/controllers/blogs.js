const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization"); //get the auth header
  if (authorization && authorization.startsWith("Bearer ")) {
    //check
    return authorization.replace("Bearer ", ""); //only keep the token key
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    console.log("token invalid");
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  savedBlog = await blog.save();
  logger.info("saved!", savedBlog);
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(404).json({ error: "blog not found" });
  }
  if (blogToDelete.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "token invalid" });
  }
});

blogsRouter.put("/:_id", (request, response) => {
  const body = request.body;
  /*
  const blog = {
    content: body.content,
    important: body.important,
  }
  */
  console.log("here ID:", request.params._id);
  Blog.findByIdAndUpdate(request.params._id, body, { new: true }) //return new doc
    .then((updatedBlog) => {
      console.log(updatedBlog);
      response.json(updatedBlog);
    });
});

module.exports = blogsRouter;
