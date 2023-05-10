import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSuccess: null,
  message: null,
};

export const tagsReducer = createReducer(initialState, {

  // create a tags
  tagsCreateRequest: (state) => {
    state.isLoading = true;
  },
  tagsCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.tags = action.payload;
    state.isSuccess = true;
    state.message = "created";
  },
  tagsCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get all tags
  getAllTagsRequest: (state) => {
    state.isLoading = true;
  },
  getAllTagsSuccess: (state, action) => {
    state.isLoading = false;
    state.allTags = action.payload;
    state.isSuccess = true;
  },
  getAllTagsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  // delete tags
  deleteTagsRequest: (state) => {
    state.isLoading = true;
  },
  deleteTagsSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload;
  },
  deleteTagsFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // edit tags
  tagsEditRequest: (state) => {
    state.isLoading = true;
  },
  tagsEditSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.editedTag = action.payload;
    state.message = "edited";
  },
  tagsEditFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // get a tags
  getATagsRequest: (state) => {
    state.isLoading = true;
  },
  getATagsSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.singleTag = action.payload;
  },
  getATagsFailed: (state, action) => {
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
