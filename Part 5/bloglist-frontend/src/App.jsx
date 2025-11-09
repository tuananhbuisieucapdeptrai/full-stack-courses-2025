import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import blog from '../../bloglist/models/blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser]   = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title,setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [addblog, setAddBlog] = useState(false)
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const handleLogin = async event => {
    event.preventDefault()
  
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } 

  const handleLogout  = async event => {
    event.preventDefault()
    window.localStorage.clear()
  }

  const handleAdding = async event => {
    event.preventDefault()

    const newblog = {
      title: title,
      author: author,
      url: url,
      user: user.id,
      likes: 0
    }

    blogService.create(newblog)
    .then(returnblog =>{
      setBlogs(blogs.concat(returnblog))
      setAuthor('')
      setTitle('')
      setUrl('')
      setAddBlog(false)
    })

  }

  const handleBlogButton = async event  => {
    event.preventDefault()
    setAddBlog(true)
  }


  const newBlogButton = () => {
    return(
      <button onClick={handleBlogButton}>
        create new blog
      </button>
  )}


  const addingForm = () => (
    <form onSubmit={handleAdding}>
      <div>
        <label>
          title 
          <input
            type = "text"
            value = {title}
            onChange={ ({target})=> setTitle(target.value) }
          />
        </label>
        <label>
          author
          <input
            type = "text"
            value = {author}
            onChange={ ({target})=> setAuthor(target.value) }
          />
        </label>
        <label>
          url
          <input
            type = "text"
            value = {url}
            onChange={ ({target})=> setUrl(target.value) }
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
  return (
    <div>
      {!user && (<div><h1>log in to application</h1></div>)}
      {!user && loginForm()}
      {user && (
        <div>
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          <h2>create new</h2>
        </div>
          {!addblog && newBlogButton()}
          {addblog && addingForm()}
          {blogs.sort((a,b)=>b.likes-a.likes ).map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App