import axios from "axios";
import { server } from "../../server";

// create event
export const createevent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config,
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// edit Event
export const editEvent = (newForm, id) => async (dispatch) => {
  try {
    dispatch({
      type: "eventEditRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${server}/event/edit-event/${id}`,
      newForm,
      config
    );
    dispatch({
      type: "eventEditSuccess",
      payload: data.editevent,
    });
  } catch (error) {
    dispatch({
      type: "eventEditFail",
      payload: error.response.data.message,
    });
  }
};


// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getAlleventsShopRequest",
      });
  
      const { data } = await axios.get(
        `${server}/event/get-all-events/${id}`
      );
      dispatch({
        type: "getAlleventsShopSuccess",
        payload: data.events,
      });
    } catch (error) {
      dispatch({
        type: "getAlleventsShopFailed",
        payload: error.response.data.message,
      });
    }
  };

  // delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteeventRequest",
      })
  
      const {data} = await axios.delete(`${server}/event/delete-shop-event/${id}`,{
        withCredentials: true,
      });
  
      dispatch({
        type: "deleteeventSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteeventFailed",
        payload: error.response.data.message,
      });
    }
  }

  // get all events
  export const getAllEvents = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAlleventsRequest",
      });

      const {data} = await axios.get(`${server}/event/get-all-events`);
      dispatch({
        type: "getAlleventsSuccess",
        payload: data.events,
      });
    } catch (error) {
      dispatch({
        type: "getAlleventsFailed",
        payload: error.response.data.message,
      });
    }
  }