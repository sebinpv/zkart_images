import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSuccess: null,
  message: null,
};

export const enquiryReducer = createReducer(initialState, {

  // create a query
  queryCreateRequest: (state) => {
    state.isLoading = true;
  },
  queryCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.query = action.payload;
    state.isSuccess = true;
    state.message = "ok";
  },
  queryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get all Enquiry
  getAllBrandsRequest: (state) => {
    state.isLoading = true;
  },
  getAllEnquirySuccess: (state, action) => {
    state.isLoading = false;
    state.allEnquiry = action.payload;
    state.isSuccess = true;
  },
  getAllEnquiryFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  // update enquiry
  updateEnquiryRequest: (state) => {
    state.isLoading = true;
  },
  updateEnquirySuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.updatedEnquiry = action.payload;
    state.message = "updated";
  },
  updateEnquiryFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // delete Enquiry
  deleteEnquiryRequest: (state) => {
    state.isLoading = true;
  },
  deleteEnquirySuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload;
  },
  deleteEnquiryFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
  //reset State
  resetState: (state) => {
    state.error = null;
    state.isSuccess = null;
    state.message = null;
  }
});

