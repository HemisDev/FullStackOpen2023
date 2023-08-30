const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length===0
    ? 1
    : 0
}

const totalLikes = (blogs) => {
  return blogs.length ===0
    ? 0
    : blogs.reduce((count,obj) => count + obj['likes'],0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length ===0) {
    return 0
  }
  const result = blogs.reduce((maxLikesBlog, currentBlog) =>
    currentBlog.likes > maxLikesBlog.likes
      ? currentBlog
      : maxLikesBlog
  ,blogs[0])

  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
}
const mostBlogs = (blogs) => {
  if(blogs.length ===0) {
    return 0
  }
  const result= _.chain(blogs)
    .countBy('author')
    .toPairs()
    .maxBy(_.last)
    .value()
  return {
    author: result[0],
    blogs: result[1]
  }
}
const mostLikes = (blogs) => {
  if(blogs.length ===0) {
    return 0
  }
  const mostLikedAuthor = _.chain(blogs)
    .groupBy('author')
    .mapValues(group => _.sumBy(group, 'likes'))
    .toPairs()
    .maxBy(pair => pair[1])
    .value()

  return {
    author: mostLikedAuthor[0],
    likes: mostLikedAuthor[1]
  }
}

module.exports = {
  dummy, totalLikes,favoriteBlog, mostBlogs, mostLikes
}