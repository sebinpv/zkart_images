import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSuccess: null,
  message: null,
};

export const categoryReducer = createReducer(initialState, {

  // create a category
  categoryCreateRequest: (state) => {
    state.isLoading = true;
  },
  categoryCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.category = action.payload;
    state.isSuccess = true;
    state.message = "created";
  },
  categoryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get all category
  getAllCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.allCategory = action.payload;
    state.isSuccess = true;
  },
  getAllCategoryFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  // delete category
  deleteCategoryRequest: (state) => {
    state.isLoading = true;
  },
  deleteCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload;
  },
  deleteCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // edit category
  categoryEditRequest: (state) => {
    state.isLoading = true;
  },
  categoryEditSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.editedCategory = action.payload;
    state.message = "edited";
  },
  categoryEditFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // get a category
  getACategoryRequest: (state) => {
    state.isLoading = true;
  },
  getACategorySuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.singleCategory = action.payload;
  },
  getACategoryFailed: (state, action) => {
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
