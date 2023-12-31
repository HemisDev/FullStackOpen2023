const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  if(body.title && body.url)
  {
    const user = request.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()
    response.status(201).json(savedBlog)
  }
  else
  {
    const blog = new Blog(body)
    response.status(400).json(blog)
  }

})
blogRouter.delete('/:id',userExtractor, async(request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if(blog.user && blog.user.toString() === user._id.toString())
  {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else
  {
    response.status(400).json(blog)
  }
})
blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})
module.exports = blogRouter