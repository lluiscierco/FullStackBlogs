const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const logger = require("../utils/logger");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password, blogs } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    blogs,
  });

  const savedUser = await user.save();
  logger.info("saved!", savedUser);
  response.status(201).json(savedUser);
});
/*
usersRouter.delete("/:id", (request, response) => {
  User.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  });
});

usersRouter.put("/:_id", (request, response) => {
  const body = request.body;


  console.log("here ID:", request.params._id);
  User.findByIdAndUpdate(request.params._id, body, { new: true }) //return new doc
    .then((updateduser) => {
      console.log(updateduser);
      response.json(updateduser);
    });
});
  */
module.exports = usersRouter;
