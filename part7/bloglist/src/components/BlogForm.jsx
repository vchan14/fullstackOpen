import { useState } from "react";

const BlogForm = ({ handleAddForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    };
    await handleAddForm(blogObject);
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          placeholder="enter title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          placeholder="enter author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          placeholder="enter url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
