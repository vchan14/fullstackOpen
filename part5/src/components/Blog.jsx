import { useState } from 'react'

const Blog = ({ blog, name, handleIncreaseLikes, handleDeleteBlog }) => {
  const [isShown, setIsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'column'
  }
  const increaseLike = (event) => {
    event.preventDefault()
    handleIncreaseLikes(blog)
  }

  const deleteblog = (event) => {
    event.preventDefault()
    handleDeleteBlog(blog)
  }


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} ---- {blog.author}
        <button onClick={() => setIsShown(!isShown)}>{isShown ? 'hide' : 'show'}</button>
      </div>
      {isShown &&(<div>
        {blog.url}
        <br/>
        {blog.likes}
        <button onClick={increaseLike}>
                    like
        </button>
        <br/>
        {name}
        <br/>
        <button onClick={deleteblog}>
                    remove
        </button>
      </div>)}
    </div>
  )
}

export default Blog