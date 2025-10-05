const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Harry Potter",
    author: "JK Rowling",
    url: "harrypotter.com",
    likes: 100000
  },
  {
    
    title: "Percy Jackson",
    author: "Rick Riordan",
    url: "percyjackson.com",
    likes: 150000
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}