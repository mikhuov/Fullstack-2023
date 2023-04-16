const listHelper = require('../utils/list_helper')
const { blogs } = require('./blogs_test');

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
});

describe('Total amount of likes: ', () => {
  test("Equal sum of likes in all the Blogs",() => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
  const result = listHelper.totalLikes(blogs);
});

describe('Most likes: ', () => {
  test('Most liked blog: ', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  });
});

describe('Most Blogs', () => {
  test('Most prolific author: ', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});

describe('Most Likes By Author', () => {
  test('Most liked author: ', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });
});