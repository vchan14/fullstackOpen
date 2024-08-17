import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}

const addBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data

}


export default { getAll, addBlog, updateBlog, deleteBlog }