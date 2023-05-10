import axios from "axios";
import { server } from "../../server";
import { createAction } from "@reduxjs/toolkit";

// create tags
export const createBlogCategory = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "blogCatCreateRequest",
    });

    const { data } = await axios.post(
      `${server}/blogcategory/create-blogCategory`,
      newForm
    );
    dispatch({
      type: "blogCatCreateSuccess",
      payload: data.blogCat,
    });
  } catch (error) {
    dispatch({
      type: "blogCatCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all Blog category
export const getAllBlogCategory = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllBlogCatRequest",
      });
  
      const { data } = await axios.get(`${server}/blogcategory/get-all-blogCategory`);
      dispatch({
        type: "getAllBlogCatSuccess",
        payload: data.blogCats,
      });
    } catch (error) {
      dispatch({
        type: "getAllBlogCatFailed",
        payload: error.response.data.message,
      });
    }
  };

  //delete a blog category
  export const deleteBcat = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteBcatRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/blogcategory/delete-blogcategory/${id}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch({
        type: "deleteBcatSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteBcatFailed",
        payload: error.response.data.message,
      });
    }
  };

// edit blogcategory
export const editBcat = (newForm, id) => async (dispatch) => {
  try {
    dispatch({
      type: "BcatEditRequest",
    });
    const { data } = await axios.put(
      `${server}/blogcategory/edit-blogcategory/${id}`,
      newForm
    );
    dispatch({
      type: "BcatEditSuccess",
      payload: data.editblogcategory,
    });
  } catch (error) {
    dispatch({
      type: "BcatEditFail",
      payload: error.response.data.message,
    });
  }
};


// get A blog category
export const getABcat = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getABcatRequest",
    });

    const { data } = await axios.get(
      `${server}/blogcategory/get-a-blogcategory/${id}`
    );
    dispatch({
      type: "getABcatSuccess",
      payload: data.singleblogcategory,
    });
  } catch (error) {
    dispatch({
      type: "getABcatFailed",
      payload: error.response.data.message,
    });
  }
};
