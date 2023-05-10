import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  isSuccess: null,
  error: null
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },

  //all vendors
  getAllVendorsRequest: (state) => {
    state.isLoading = true;
  },
  getAllVendorsSuccess: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.isSuccess = true;
    state.allVendors = action.payload;
  },
  getAllVendorsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },

  // shop forgot password
  forgotPasswordRequest: (state) => {
    state.isLoading = true;
  },
  forgotPasswordSuccess: (state, action) => {
    state.isLoading = false;
    state.forgotpass = action.payload;
    state.isSuccess = true;
    state.message = "ok";
  },
  forgotPasswordFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  // shop reset password
  resetPasswordRequest: (state) => {
    state.isLoading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.isLoading = false;
    state.resetpass = action.payload;
    state.isSuccess = true;
    state.message = "ok";
  },
  resetPasswordFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  },

  // withdraw
  withdrawRequest: (state) => {
    state.isLoading = true;
  },
  withdrawSuccess: (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.withdraw = action.payload;
    state.message = "withdrawed";
    if(state.isSuccess){
      toast.success("Withdrawal is Successfull");
    }
  },
  withdrawFailed: (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.error = action.payload;
    if(!state.isSuccess){
      toast.error(state.error);
    }
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
