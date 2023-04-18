const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper')
const Blog = require('../models/blog');
const api = supertest(app);

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

test("A valid blog can be added", async () => {
    const newBlog = {
      title: "testi2",
      author: "Mikael",
      url: "youtube.com",
      likes: 10,
    };
    
    await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/);
    
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

describe("Deletion of a Blog", () => {
  test("Succeeds with status code 204 if id is valid", async () => {
    const blogToBeDeleted = {
      title: 'Delete',
      author: 'Deletor',
      url: 'localhost:3003'
    };

    await api.post('/api/blogs').send(blogToBeDeleted).expect(201).expect("Content-Type", /application\/json/);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[1];
    console.log('blogToDelete: ', blogToDelete);
  
    await api.delete(`/api/blogs/${ blogToDelete.id }`).expect(204);
  
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
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