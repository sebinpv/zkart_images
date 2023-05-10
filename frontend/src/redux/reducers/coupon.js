import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  isSuccess: false,
  error: null,
  message: null,
};

export const couponReducer = createReducer(initialState, {

  // create a coupon
  couponCreateRequest: (state) => {
    state.isLoading = true;
  },
  couponCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.coupon = action.payload;
    state.isSuccess = true;
    state.message = "created";
  },
  couponCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get all Coupon
  getAllCouponRequest: (state) => {
    state.isLoading = true;
  },
  getAllCouponSuccess: (state, action) => {
    state.isLoading = false;
    state.allCoupon = action.payload;
    state.isSuccess = true;
  },
  getAllCouponFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  //get Shop Coupon
  getShopCouponRequest: (state) => {
    state.isLoading = true;
  },
  getShopCouponSuccess: (state, action) => {
    state.isLoading = false;
    state.shopCoupon = action.payload;
    state.isSuccess = true;
  },
  getShopCouponFail: (state, action) => {
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

  // edit coupon
  couponEditRequest: (state) => {
    state.isLoading = true;
  },
  couponEditSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.editedCoupon = action.payload;
    state.message = "edited";
  },
  couponEditFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
  },

  // get a coupon
  getACouponRequest: (state) => {
    state.isLoading = true;
  },
  getACouponSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.singleCoupon = action.payload;
  },
  getACouponFailed: (state, action) => {
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
