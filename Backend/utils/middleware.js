const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization"); //get the auth header
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", ""); //only keep the token key
    console.log("middleware:", request.token);
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    console.log("token missing");
    request.user = null;
    return response.status(401).json({ error: "token missing" });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    console.log("token invalid");
    request.user = null;
    response.status(401).json({ error: "token invalid" });
  }
  request.user = await User.findById(decodedToken.id);
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
