import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSuccess: null,
  message: null,
};

export const blogReducer = createReducer(initialState, {

  // create a blog
  blogCreateRequest: (state) => {
    state.isLoading = true;
  },
  blogCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.blog = action.payload;
    state.isSuccess = true;
    state.message = "created";
  },
  blogCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get all blog
  getAllBlogsRequest: (state) => {
    state.isLoading = true;
  },
  getAllBlogsSuccess: (state, action) => {
    state.isLoading = false;
    state.allBlogs = action.payload;
    state.isSuccess = true;
  },
  getAllBlogsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get filter blog
  getAllfBlogsRequest: (state) => {
    state.isLoading = true;
  },
  getAllfBlogsSuccess: (state, action) => {
    state.isLoading = false;
    state.allfBlogs = action.payload;
    state.isSuccess = true;
  },
  getAllfBlogsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get a blog
  getABlogRequest: (state) => {
    state.isLoading = true;
  },
  getABlogSuccess: (state, action) => {
    state.isLoading = false;
    state.singleBlog = action.payload;
    state.isSuccess = true;
  },
  getABlogFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  // delete blog
  deleteBlogRequest: (state) => {
    state.isLoading = true;
  },
  deleteBlogSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload;
  },
  deleteBlogFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // edit blog
  blogEditRequest: (state) => {
    state.isLoading = true;
  },
  blogEditSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.editedBlog = action.payload;
    state.message = "edited";
  },
  blogEditFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  //get user blog
  getUserBlogRequest: (state) => {
    state.isLoading = true;
  },
  getUserBlogSuccess: (state, action) => {
    state.isLoading = false;
    state.userBlogs = action.payload;
    state.isSuccess = true;
  },
  getUserBlogFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
  //reset State
  resetState: (state) => {
    state.error = null;
    state.isSuccess = null;
    state.message = null;
  }
});
