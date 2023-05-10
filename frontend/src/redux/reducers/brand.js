import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  isSuccess: null,
  error: null,
  message: null,
};

export const brandReducer = createReducer(initialState, {

  // create a brand
  brandCreateRequest: (state) => {
    state.isLoading = true;
  },
  brandCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.brand = action.payload;
    state.isSuccess = true;
    state.message = "ok";
  },
  brandCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get all brands
  getAllBrandsRequest: (state) => {
    state.isLoading = true;
  },
  getAllBrandsSuccess: (state, action) => {
    state.isLoading = false;
    state.allBrands = action.payload;
    state.isSuccess = true;
  },
  getAllBrandsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  // delete brand
  deleteBrandRequest: (state) => {
    state.isLoading = true;
  },
  deleteBrandSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload;
  },
  deleteBrandFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // edit brand
  brandEditRequest: (state) => {
    state.isLoading = true;
  },
  brandEditSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.editedBrand = action.payload;
    state.message = "edited";
  },
  brandEditFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // get a brand
  getABrandRequest: (state) => {
    state.isLoading = true;
  },
  getABrandSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.singleBrand = action.payload;
  },
  getABrandFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  //reset State
  resetState: (state) => {
    state.error = null;
    state.isSuccess = null;
    state.message = null;
  }
});
