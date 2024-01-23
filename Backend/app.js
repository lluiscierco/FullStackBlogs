const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

logger.info("Connecting to MongoDB...");
const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(logger.info("Connection to MongoDB successful"))
  .catch((error) => logger.info("Connection to MongoDB failed", error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
