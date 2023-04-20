const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper')
const Blog = require('../models/blog');
const User = require("../models/user");
const config = require("../utils/config");
const bcrypt = require("bcrypt");
const api = supertest(app);
const jwt = require("jsonwebtoken");

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
});

test("id instead of _id", async () => {
    const response = await api.get("/api/blogs");

    const ids = response.body.map(blog => blog.id);

    for (const id of ids) {
      expect(id).toBeDefined();
    }
});

  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();

    const userForToken = { username: user.username, id: user.id };
    token = jwt.sign(userForToken, config.SECRET);
    return token;
  });

  test("A valid blog can be added", async () => {
    const newBlog = {
      title: "testi2",
      author: "Mikael",
      url: "youtube.com",
      likes: 10,
    };
    
    await api.post("/api/blogs").send(newBlog).set({'Authorization': `Bearer ${ token }`}).expect(201).expect("Content-Type", /application\/json/);
    
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const title = blogsAtEnd.map(blog => blog.title);
    expect(title).toContain("testi2");
});

test("Empty likes = 0", async () => {
    const newBlog = {
        title: "testi3",
        author: "Mikael",
        url: "twitter.com"
    };
    
    await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
});

test("Title and/or Url missing", async () => {
    const newBlog = {
        author: "Mikael",
        likes: 1
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
   
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("User adds a blog", async () => {
  const newBlog = {
    title: "User adds a blog",
    author: "User",
    url: "google.com",
    likes: 1,
  };

  await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(201).expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("User adds a blog");
});

describe("Deletion of a Blog", () => {
  let token = null;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();

    const userForToken = { username: user.username, id: user.id };
    token = jwt.sign(userForToken, config.SECRET);
    return token;
  });

  test("Succeeds with status code 204 if id is valid", async () => {
    const testBlog = {
      title: 'Delete',
      author: 'Deletor',
      url: 'localhost:3003'
    };

    await api.post('/api/blogs').send(testBlog).set({'Authorization': `Bearer ${ token }`}).expect(201).expect("Content-Type", /application\/json/);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart.find(blog => blog.title === testBlog.title);
    console.log(blogsAtStart)
    await api.delete(`/api/blogs/${ blogToDelete.id }`).set({'Authorization': `Bearer ${ token }`}).expect(204);
  
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    const blogs = blogsAtEnd.map(blog => blog.title);
    expect(blogs).not.toContain(blogToDelete.title);
  });
});

test("Update Blog", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  await api.put(`/api/blogs/${ blogToUpdate.id }`).send({ title: 'Update Test' }).expect(200);
  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  expect(blogsAtEnd[0].title).toBe('Update Test');
});

afterAll(async () => {
  await mongoose.connection.close();
});