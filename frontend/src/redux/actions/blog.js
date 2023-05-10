import axios from "axios";
import { server } from "../../server";

// create blog
export const createBlog = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "blogCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/blog/create-blog`,
      newForm,
      config
    );
    dispatch({
      type: "blogCreateSuccess",
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: "blogCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all blog
export const getAllBlogs = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllBlogsRequest",
      });
  
      const { data } = await axios.get(`${server}/blog/get-all-blogs`);
      dispatch({
        type: "getAllBlogsSuccess",
        payload: data.blogs,
      });
    } catch (error) {
      dispatch({
        type: "getAllBlogsFailed",
        payload: error.response.data.message,
      });
    }
  };

// get a blog
export const getABlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getABlogRequest",
    });

    const { data } = await axios.get(`${server}/blog/get-blog/${id}`);
    dispatch({
      type: "getABlogSuccess",
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: "getABlogFailed",
      payload: error.response.data.message,
    });
  }
};

// get filter bogs
export const getAllfBlogs = (fdata) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllfBlogsRequest",
    });

    const { data } = await axios.get(`${server}/blog/get-all-fblogs?${fdata?.category?`category=${fdata?.category}&&`:""}${fdata?.sort?`sort=${fdata?.sort}&&`:""}`);
    dispatch({
      type: "getAllfBlogsSuccess",
      payload: data.blogs,
    });
  } catch (error) {
    dispatch({
      type: "getAllfBlogsFailed",
      payload: error.response.data.message,
    });
  }
};

//delete a blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteBlogRequest",
    });

    const { data } = await axios.delete(
      `${server}/blog/delete-blog/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteBlogSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteBlogFailed",
      payload: error.response.data.message,
    });
  }
};

// edit blog
export const editBlog = (newForm, id) => async (dispatch) => {
try {
  dispatch({
    type: "blogEditRequest",
  });

  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const { data } = await axios.put(
    `${server}/blog/edit-blog/${id}`,
    newForm,
    config
  );
  dispatch({
    type: "blogEditSuccess",
    payload: data.editblog,
  });
} catch (error) {
  dispatch({
    type: "blogEditFail",
    payload: error.response.data.message,
  });
}
};

// get user blog
export const getUserBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getUserBlogRequest",
    });

    const { data } = await axios.get(`${server}/blog/get-user-blog/${id}`);
    dispatch({
      type: "getUserBlogSuccess",
      payload: data.userblog,
    });
  } catch (error) {
    dispatch({
      type: "getUserBlogFailed",
      payload: error.response.data.message,
    });
  }
};