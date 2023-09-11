const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithMultipleBlogs)
})

describe('generic blog content tests',() => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.listWithMultipleBlogs.length)
  })
  test('check that id is delimiter', async () => {
    const response = await api.get('/api/blogs')
    response._body.forEach((item) => {
      expect(item.id).toBeDefined()
    })
  })
})
describe('operations tests',() => {

  test('add blog to collection', async () => {
    const user = {
      username: 'testi',
      password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(user)
      .expect(200)
    const newBlog= {
      title: 'test title',
      author: 'testing author',
      url:'https://www.google.com',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentBlogList = await helper.blogsInDb()
    expect(currentBlogList).toHaveLength(helper.listWithMultipleBlogs.length +1)

    const blogs = currentBlogList.map(n => n.title)
    expect(blogs).toContain('test title')
  })
  test('add blog to collection without likes', async () => {
    const user = {
      username: 'testi',
      password: 'salainen'
    }
    const login = await api
      .post('/api/login')
      .send(user)
      .expect(200)
    const newBlog= {
      title: 'test title',
      author: 'testing author',
      url:'https://www.google.com'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentBlogList = await helper.blogsInDb()
    expect(currentBlogList).toHaveLength(helper.listWithMultipleBlogs.length +1)

    const blogs = currentBlogList.map(n => n.title)
    expect(blogs).toContain('test title')
  })
  test('add blog to collection without title', async () => {
    const user = {
      username: 'testi',
      password: 'salainen'
    }
    const login = await api
      .post('/api/login')
      .send(user)
      .expect(200)
    const newBlog= {
      author: 'testing author',
      url:'https://www.google.com'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('add blog to collection without url', async () => {
    const user = {
      username: 'testi',
      password: 'salainen'
    }
    const login = await api
      .post('/api/login')
      .send(user)
      .expect(200)
    const newBlog= {
      title: 'test title',
      author: 'testing author'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('cant remove a blog you did not make from collection', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const user = {
      username: 'testi',
      password: 'salainen'
    }
    const login = await api
      .post('/api/login')
      .send(user)
      .expect(200)
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${login._body.token}`)
      .expect(400)
  })
  test('cant add a blog without authorization', async () => {
    const newBlog= {
      title: 'test title',
      author: 'testing author',
      url:'https://www.google.com',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
  test('remove a blog from collection', async () => {
    const user = {
      username: 'testi',
      password: 'salainen'
    }
    const login = await api
      .post('/api/login')
      .send(user)
      .expect(200)
    const newBlog= {
      title: 'test title',
      author: 'testing author',
      url:'https://www.google.com',
      likes: 10,
      login: login._body.user
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentBlogList = await helper.blogsInDb()
    expect(currentBlogList).toHaveLength(helper.listWithMultipleBlogs.length +1)
    const blogToDelete = currentBlogList[helper.listWithMultipleBlogs.length]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${login._body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.listWithMultipleBlogs.length
    )
    const contents = blogsAtEnd.map(item => item.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
  test('update a blog in collection', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 20
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(item => item.likes)
    expect(contents[0]).toBe(20)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.listWithMultipleBlogs)
    expect(result).toBe(36)
  })

})
describe('blog statistics', () => {

  test('favourite blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithMultipleBlogs)
    expect(result).toEqual(helper.favorite)
  })
  test('most blogs', () => {
    const result = listHelper.mostBlogs(helper.listWithMultipleBlogs)
    expect(result).toEqual(helper.mostblogs)
  })
  test('most likes', () => {
    const result = listHelper.mostLikes(helper.listWithMultipleBlogs)
    expect(result).toEqual(helper.mostLiked)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})