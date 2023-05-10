import axios from "axios";
import { server } from "../../server";

// create coupon
export const createCoupon = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "couponCreateRequest",
    });

    const { data } = await axios.post(
      `${server}/coupon/create-coupon-code`,
      newForm,
      { withCredentials: true }
    );
    dispatch({
      type: "couponCreateSuccess",
      payload: data.coupon,
    });
  } catch (error) {
    dispatch({
      type: "couponCreateFail",
      payload: error.response.data.message,
    });
  }
};

// edit coupon
export const editCoupon = (newForm, id) => async (dispatch) => {
    try {
      dispatch({
        type: "couponEditRequest",
      });
  
      const { data } = await axios.put(
        `${server}/coupon/edit-coupon/${id}`,
        newForm
      );
      dispatch({
        type: "couponEditSuccess",
        payload: data.editcoupon,
      });
    } catch (error) {
      dispatch({
        type: "couponEditFail",
        payload: error.response.data.message,
      });
    }
  };
  
  
  // get A coupon
  export const getACoupon = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getACouponRequest",
      });
  
      const { data } = await axios.get(
        `${server}/coupon/get-a-coupon/${id}`
      );
      dispatch({
        type: "getACouponSuccess",
        payload: data.singlecoupon,
      });
    } catch (error) {
      dispatch({
        type: "getACouponFailed",
        payload: error.response.data.message,
      });
    }
  };

  // get all coupons
  export const getAllCoupon = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllCouponRequest",
      });
  
      const { data } = await axios.get(
        `${server}/coupon/get-all-coupon`
      );
      dispatch({
        type: "getAllCouponSuccess",
        payload: data.coupons,
      });
    } catch (error) {
      dispatch({
        type: "getAllCouponFailed",
        payload: error.response.data.message,
      });
    }
  };

  //get shop coupon
  export const getShopCoupon = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getShopCouponRequest",
      });
  
      const { data } = await axios.get(
        `${server}/coupon/get-coupon/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "getShopCouponSuccess",
        payload: data.couponCodes,
      });
    } catch (error) {
      dispatch({
        type: "getShopCouponFailed",
        payload: error.response.data.message,
      });
    }
  };