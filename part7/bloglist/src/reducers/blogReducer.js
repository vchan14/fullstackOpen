import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogService.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export const fetchBlogs = (token) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(token);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject, token) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(blogObject, token);
    dispatch(addBlog(newBlog));
  };
};

export const modifyBlog = (blogObject, token) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(blogObject, token);
    dispatch(updateBlog(updatedBlog));
  };
};

export const removeBlog = (id, token) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id, token);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;