import axios from "axios";
import { server } from "../../server";
import { createAction } from "@reduxjs/toolkit";

// create brand
export const createBrand = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "brandCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/brand/create-brand`,
      newForm,
      config
    );
    dispatch({
      type: "brandCreateSuccess",
      payload: data.brand,
    });
  } catch (error) {
    dispatch({
      type: "brandCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all brands
export const getAllBrands = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllBrandsRequest",
      });
  
      const { data } = await axios.get(`${server}/brand/get-all-brands`);
      dispatch({
        type: "getAllBrandsSuccess",
        payload: data.brands,
      });
    } catch (error) {
      dispatch({
        type: "getAllBrandsFailed",
        payload: error.response.data.message,
      });
    }
  };


  //delete a brand
  export const deleteBrand = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteBrandRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/brand/delete-brand/${id}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch({
        type: "deleteBrandSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteBrandFailed",
        payload: error.response.data.message,
      });
    }
  };

// edit brand
export const editBrand = (newForm, id) => async (dispatch) => {
  try {
    dispatch({
      type: "brandEditRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${server}/brand/edit-brand/${id}`,
      newForm,
      config
    );
    dispatch({
      type: "brandEditSuccess",
      payload: data.editbrand,
    });
  } catch (error) {
    dispatch({
      type: "brandEditFail",
      payload: error.response.data.message,
    });
  }
};


// get A brand
export const getABrand = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getABrandRequest",
    });

    const { data } = await axios.get(
      `${server}/brand/get-a-brand/${id}`
    );
    dispatch({
      type: "getABrandSuccess",
      payload: data.singlebrand,
    });
  } catch (error) {
    dispatch({
      type: "getABrandFailed",
      payload: error.response.data.message,
    });
  }
};