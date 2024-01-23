const axios = require("axios");
const apiUrl = "http://localhost:3003/api/blogs";
const usersUrl = "http://localhost:3003/api/users";
const loginUrl = "http://localhost:3003/api/login";

// Blog DB testing

const blog = {
  title: "How to Win",
  author: "Me",
  url: "htw.com",
  likes: 30,
  user: "65ada01c71f6a9d577490a9e",
};
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IllveWkyOCIsImlkIjoiNjVhZGEwMWM3MWY2YTlkNTc3NDkwYTllIiwiaWF0IjoxNzA1OTM4MDg1fQ.uN8mVOkWvPLWzpp667hMzPfUqda_yJSLnUhaJTBXzlE";
/*
axios
  .post("http://localhost:3003/api/blogs", blog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log("success!", response.data);
  })
  .catch((error) => console.log("error", error.message));

axios
  .get(apiUrl)
  .then((response) => {
    console.log("success", JSON.stringify(response.data, null, 2));
  })
  .catch((error) => console.log("error", error.response.data));
 */
axios
  .delete(`${apiUrl}/65ae5e8f721b79ef2a802a87`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log("success", response.data);
  })
  .catch((error) => console.log("error", error.message));
// Users DB testing
user = {
  username: "Yoyi28",
  password: "secret.19",
  name: "George",
  blogs: ["65a16e98418af474427f3b76"],
};
/*
axios
  .post(usersUrl, user)
  .then((response) => {
    console.log("success!");
  })
  .catch((error) => console.log("error"));

axios
  .get(usersUrl)
  .then((response) => {
    console.log("success!", JSON.stringify(response.data, null, 2));
  })
  .catch((error) => console.log("error"));


// Token AUTH
user = {
  username: "Yoyi28",
  password: "secret.19",
};

axios
  .post(loginUrl, user)
  .then((response) => {
    console.log("success!", response.data);
  })
  .catch((error) => console.log("error"));
*/
