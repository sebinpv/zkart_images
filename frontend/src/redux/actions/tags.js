import axios from "axios";
import { server } from "../../server";

// create tags
export const createTags = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "tagsCreateRequest",
    });

    const { data } = await axios.post(
      `${server}/tags/create-tags`,
      newForm
    );
    dispatch({
      type: "tagsCreateSuccess",
      payload: data.tags,
    });
  } catch (error) {
    dispatch({
      type: "tagsCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all tags
export const getAllTags = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllTagsRequest",
      });
  
      const { data } = await axios.get(`${server}/tags/get-all-tags`);
      dispatch({
        type: "getAllTagsSuccess",
        payload: data.tags,
      });
    } catch (error) {
      dispatch({
        type: "getAllTagsFailed",
        payload: error.response.data.message,
      });
    }
  };

//delete a Tags
export const deleteTags = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteTagsRequest",
    });

    const { data } = await axios.delete(
      `${server}/tags/delete-tags/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteTagsSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteTagsFailed",
      payload: error.response.data.message,
    });
  }
};

// edit Tags
export const editTags = (newForm, id) => async (dispatch) => {
try {
  dispatch({
    type: "tagsEditRequest",
  });
  const { data } = await axios.put(
    `${server}/tags/edit-tags/${id}`,
    newForm
  );
  dispatch({
    type: "tagsEditSuccess",
    payload: data.edittags,
  });
} catch (error) {
  dispatch({
    type: "tagsEditFail",
    payload: error.response.data.message,
  });
}
};


// get A tags
export const getATags = (id) => async (dispatch) => {
try {
  dispatch({
    type: "getATagsRequest",
  });

  const { data } = await axios.get(
    `${server}/tags/get-a-tag/${id}`
  );
  dispatch({
    type: "getATagsSuccess",
    payload: data.singletag,
  });
} catch (error) {
  dispatch({
    type: "getATagsFailed",
    payload: error.response.data.message,
  });
}
};