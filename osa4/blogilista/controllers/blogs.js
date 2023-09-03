const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if(blog.title && blog.url)
  {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  else{
    response.status(400).json(blog)
  }
})
blogRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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