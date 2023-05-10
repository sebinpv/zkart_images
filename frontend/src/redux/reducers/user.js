import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  isSuccess: null,
};

export const userReducer = createReducer(initialState, {

  //load admin
  LoadAdminRequest: (state) => {
    state.isLoading = true;
  },
  LoadAdminSuccess: (state, action) => {
    state.isAdmin = true;
    state.isLoading = false;
    state.admin = action.payload;
  },
  LoadAdminFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAdmin = false;
  },

  //load user
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // update user information
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // update user address
  updateUserAddressRequest: (state) => {
    state.addressloading = true;
  },
  updateUserAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  updateUserAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },

  // delete user address
  deleteUserAddressRequest: (state) => {
    state.addressloading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  deleteUserAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },

  // get all users
  getAllUsersRequest: (state) => {
    state.isLoading = true;
  },
  getAllUsersSuccess: (state, action) => {
    state.isLoading = false;
    state.allUsers = action.payload;
    state.isSuccess = true;
  },
  getAllUsersFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

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

  // forgot password
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

  // reset password
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

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});

