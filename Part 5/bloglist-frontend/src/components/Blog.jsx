import { useState } from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(false)
  const handleView = async event => {
    event.preventDefault()
    setView(true)
  }

  const buttonview = () => (
    <button onClick={handleView}>view</button>
  )

  const handleLike = async event => {
    event.preventDefault()
    const updating_blog = {
      id : blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user : blog.user.id,
      likes: blog.likes + 1
    }

    await blogService.put(updating_blog)

    
  }

  const buttonlike = () => (
    <button onClick={handleLike}>like</button>
  )
  return(
    <div style={blogStyle}>
      {blog.title} 
      {!view && buttonview()}
      {view && blog.author}
      {view && blog.likes}
      {view && buttonlike()}
      {view && blog.url}
    </div>  
)}

export default Blog