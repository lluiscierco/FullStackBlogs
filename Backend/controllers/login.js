const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const logger = require("../utils/logger");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    password === null
      ? False
      : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    // if any is false return error
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
  const userForToken = {
    //prepare token for user
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET); // create token
  // We must create first a variable env.SECTRET in .env
  // The token conteins the userForToken information encoded (encrypted)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name }); //send token info
});

module.exports = loginRouter;
