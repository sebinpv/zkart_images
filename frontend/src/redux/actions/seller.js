import axios from "axios";
import { server } from "../../server";

// get all Users
export const getAllVendors = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllVendorsRequest",
      });
  
      const { data } = await axios.get(`${server}/shop/get-all-vendors`);
      dispatch({
        type: "getAllVendorsSuccess",
        payload: data.vendors,
      });
    } catch (error) {
      dispatch({
        type: "getAllVendorsFailed",
        payload: error.response.data.message,
      });
    }
  };

  //shop forgot password

export const shopForgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });
    const { data } = await axios.post(
      `${server}/shop/forgot-password`,
      email
    );
    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.password,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload: error.response.data.message,
    });
  }
};


//shop reset password

export const shopResetPassword = (rdata) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });
    const { data } = await axios.put(
      `${server}/shop/reset-password/${rdata.token}`,
      {password: rdata?.password}
    );
    dispatch({
      type: "resetPasswordSuccess",
      payload: data.password,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFail",
      payload: error.response.data.message,
    });
  }
};

// withdraw balance
export const withdraw = (bdata) => async (dispatch) => {
  try {
    dispatch({
      type: "withdrawRequest",
    });
    const { data } = await axios.put(
      `${server}/shop/withdraw`,
      bdata
    );
    dispatch({
      type: "withdrawSuccess",
      payload: data.withdraw,
    });
  } catch (error) {
    dispatch({
      type: "withdrawFail",
      payload: error.response.data.message,
    });
  }
};