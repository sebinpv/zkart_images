import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {

  // create a product
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // edit a product
  productEditRequest: (state) => {
    state.isLoading = true;
  },
  productEditSuccess: (state, action) => {
    state.isLoading = false;
    state.editproduct = action.payload;
    state.success = true;
  },
  productEditFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all products of shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

    // get a product from shop
    getAProductShopRequest: (state) => {
      state.isLoading = true;
    },
    getAProductShopSuccess: (state, action) => {
      state.isLoading = false;
      state.singleproduct = action.payload;
    },
    getAProductShopFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  // delete product of a shop
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get a product
  getAProductRequest: (state) => {
    state.isLoading = true;
  },
  getAProductSuccess: (state, action) => {
    state.isLoading = false;
    state.aProduct = action.payload;
  },
  getAProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products cust
  getAllcProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllcProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allcProducts = action.payload;
  },
  getAllcProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // review a product
  rateProductRequest: (state) => {
    state.isLoading = true;
  },
  rateProductSuccess: (state, action) => {
    state.isLoading = false;
    state.rateProduct = action.payload;
    state.success = true;
    state.message = "review created"
  },
  rateProductFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
});
