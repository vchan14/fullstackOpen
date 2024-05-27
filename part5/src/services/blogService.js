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

export default { getAll, addBlog }