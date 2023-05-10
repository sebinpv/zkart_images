import axios from "axios";
import { server } from "../../server";

// create enquiry
export const createQuery = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "queryCreateRequest",
    });
    const { data } = await axios.post(
      `${server}/enquiry/create-query`,
      newForm
    );
    dispatch({
      type: "queryCreateSuccess",
      payload: data.query,
    });
  } catch (error) {
    dispatch({
      type: "queryCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all enquiry
export const getAllEnquiry = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEnquiryRequest",
    });

    const { data } = await axios.get(`${server}/enquiry/get-all-enquiry`);
    dispatch({
      type: "getAllEnquirySuccess",
      payload: data.enquiry,
    });
  } catch (error) {
    dispatch({
      type: "getAllEnquiryFailed",
      payload: error.response.data.message,
    });
  }
};

// get a enquiry
export const getAEnquiry = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAEnquiryRequest",
    });

    const { data } = await axios.get(`${server}/enquiry/get-a-enquiry`);
    dispatch({
      type: "getAEnquirySuccess",
      payload: data.enquiry,
    });
  } catch (error) {
    dispatch({
      type: "getAEnquiryFailed",
      payload: error.response.data.message,
    });
  }
};

// update enquiry
export const updateEnquiry = (enqData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateEnquiryRequest",
    });

    const { data } = await axios.put(`${server}/enquiry/update-enquiry/${enqData.id}`,
    enqData
    );
    dispatch({
      type: "updateEnquirySuccess",
      payload: data.enquiry,
    });
  } catch (error) {
    dispatch({
      type: "updateEnquiryFailed",
      payload: error.response.data.message,
    });
  }
};

//delete a Enquiry
export const deleteEnquiry = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEnquiryRequest",
    });

    const { data } = await axios.delete(
      `${server}/enquiry/delete-enquiry/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteEnquirySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEnquiryFailed",
      payload: error.response.data.message,
    });
  }
};
