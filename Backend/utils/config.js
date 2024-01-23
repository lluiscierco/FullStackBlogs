require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI //defined in .env, the URL to test DB
    : process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
