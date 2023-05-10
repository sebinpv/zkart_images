import axios from "axios";
import { server } from "../../server";

// create category
export const createCategory = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "categoryCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/category/create-category`,
      newForm,
      config
    );
    dispatch({
      type: "categoryCreateSuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "categoryCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all category
export const getAllCategory = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllCategoryRequest",
      });
  
      const { data } = await axios.get(`${server}/category/get-all-category`);
      dispatch({
        type: "getAllCategorySuccess",
        payload: data.category,
      });
    } catch (error) {
      dispatch({
        type: "getAllCategoryFailed",
        payload: error.response.data.message,
      });
    }
  };

  //delete a category
  export const deleteCategory = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCategoryRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/category/delete-category/${id}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch({
        type: "deleteCategorySuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteCategoryFailed",
        payload: error.response.data.message,
      });
    }
  };

// edit category
export const editCategory = (newForm, id) => async (dispatch) => {
  try {
    dispatch({
      type: "categoryEditRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${server}/category/edit-category/${id}`,
      newForm,
      config
    );
    dispatch({
      type: "categoryEditSuccess",
      payload: data.editcategory,
    });
  } catch (error) {
    dispatch({
      type: "categoryEditFail",
      payload: error.response.data.message,
    });
  }
};


// get A category
export const getACategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getACategoryRequest",
    });

    const { data } = await axios.get(
      `${server}/category/get-a-category/${id}`
    );
    dispatch({
      type: "getACategorySuccess",
      payload: data.singlecategory,
    });
  } catch (error) {
    dispatch({
      type: "getACategoryFailed",
      payload: error.response.data.message,
    });
  }
};