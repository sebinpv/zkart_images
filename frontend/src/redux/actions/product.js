import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// edit product
export const editProduct = (newForm, id) => async (dispatch) => {
  try {
    dispatch({
      type: "productEditRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${server}/product/edit-product/${id}`,
      newForm,
      config
    );
    dispatch({
      type: "productEditSuccess",
      payload: data.editproduct,
    });
  } catch (error) {
    dispatch({
      type: "productEditFail",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// get A Product from shop
export const getAProductShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAProductShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-a-product-shop/${id}`
    );
    dispatch({
      type: "getAProductShopSuccess",
      payload: data.singleproduct,
    });
  } catch (error) {
    dispatch({
      type: "getAProductShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

// get a product
export const getAProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAProductRequest",
    });

    const { data } = await axios.get(`${server}/product/get-a-product/${id}`);
    dispatch({
      type: "getAProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getAProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products for customer
export const getAllcProducts = (fdata) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllcProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-cproducts?${fdata?.brand?`brand=${fdata?.brand}&&`:""}${fdata?.tag?`tags=${fdata?.tag}&&`:""}${fdata?.category?`category=${fdata?.category}&&`:""}${fdata?.minPrice?`discountPrice[gte]=${fdata?.minPrice}&&`:""}${fdata?.maxPrice?`discountPrice[lte]=${fdata?.maxPrice}&&`:""}${fdata?.sort?`sort=${fdata?.sort}&&`:""}`);
    dispatch({
      type: "getAllcProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllcProductsFailed",
      payload: error.response.data.message,
    });
  }
};

// add rating
export const rateProduct = (newdata) => async (dispatch) => {
  try {
    dispatch({
      type: "rateProductRequest",
    });

    const { data } = await axios.put(
      `${server}/product/create-new-review`,
      newdata
    );
    dispatch({
      type: "rateProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "rateProductFail",
      payload: error.response.data.message,
    });
  }
};
