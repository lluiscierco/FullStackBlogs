const mongoose = require("mongoose");
const supertest = require("supertest"); //import
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app); //create a superagent for http requests

beforeEach(async () => {
  initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  // before each test restart DB to default
  await Blog.deleteMany({}); // delete all
  await Blog.insertMany(initialBlogs); // create DB
});

test("notes are returned as json", async () => {
  //define func as async
  await api // execution of the func will wait until await is compelted
    .get("/api/blogs")
    .expect(200)
    .expect((response) => {
      expect(response.body).toHaveLength(2);
    })
    .expect("Content-Type", /application\/json/); //regex match
});

test("unique identifier property is named id", async () => {
  await api
    .get("/api/blogs")
    .expect((response) => expect(response.body[0].id).toBeDefined());
});

test("add a new post", async () => {
  const newBlog = {
    title: "test",
    author: "test",
    url: "test",
    likes: 10,
  };
  await api.post("/api/blogs").send(newBlog);
  const finalBlogs = await api.get("/api/blogs");
  expect(finalBlogs.body).toHaveLength(initialBlogs.length + 1);
  expect(finalBlogs.body).toContainEqual(expect.objectContaining(newBlog));
});

test("delte a post", async () => {
  const id = "5a422a851b54a676234d17f7";
  await api.delete(`/api/blogs/${id}`).expect(204);
  const finalBlogs = await api.get("/api/blogs");
  expect(finalBlogs.body).toHaveLength(1);
  expect(
    finalBlogs.body.find((blog) => blog.title === "React patterns"),
  ).toBeUndefined();
});

test("update a post", async () => {
  const updateBlog = {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns Updated",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  };

  console.log(updateBlog.id);
  await api.put(`/api/blogs/${updateBlog.id}`).send(updateBlog);

  const finalBlogs = await api.get("/api/blogs");
  //console.log(finalBlogs);
  expect(finalBlogs.body).toHaveLength(2);

  console.log(finalBlogs.body);
  expect(
    finalBlogs.body.find((blog) => blog.title === "React patterns Updated"),
  ).toBeDefined();
});

afterAll(async () => {
  // once all test are finished
  await mongoose.connection.close();
});
