import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSuccess: null,
  message: null,
};

export const blogCategoryReducer = createReducer(initialState, {

  // create a blog category
  blogCatCreateRequest: (state) => {
    state.isLoading = true;
  },
  blogCatCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.blogCat = action.payload;
    state.isSuccess = true;
    state.message = "created";
  },
  blogCatCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get all blog categories
  getAllBlogCatRequest: (state) => {
    state.isLoading = true;
  },
  getAllBlogCatSuccess: (state, action) => {
    state.isLoading = false;
    state.allBlogCats = action.payload;
    state.isSuccess = true;
  },
  getAllBlogCatFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  // delete blog category
  deleteBcatRequest: (state) => {
    state.isLoading = true;
  },
  deleteBcatSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload;
  },
  deleteBcatFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // edit blog category
  BcatEditRequest: (state) => {
    state.isLoading = true;
  },
  BcatEditSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.editedBcat = action.payload;
    state.message = "edited";
  },
  BcatEditFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // get a blog category
  getABcatRequest: (state) => {
    state.isLoading = true;
  },
  getABcatSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.singleBcat = action.payload;
  },
  getABcatFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
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
