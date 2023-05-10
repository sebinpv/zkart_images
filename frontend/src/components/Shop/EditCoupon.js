import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editCoupon, getACoupon } from "../../redux/actions/coupon";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import * as yup from "yup";
import { useFormik } from "formik";

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  minAmount: yup.number().required("Minimum Eligible Amount is Required"),
  maxAmount: yup.number().required("Maximum Discount Amount is Required"),
  value: yup.number().required("Discount Percentage is Required"),
  selectedProduct: yup.string().required("Product is Required"),
});

const EditCoupon = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[3];


  const { seller } = useSelector((state) => state?.seller);
  const products = useSelector((state) => state.products?.products);
  const couponState = useSelector((state) => state.coupon?.singleCoupon);
  const coupon = useSelector((state) => state.coupon);

  useEffect(() => {
    getCoupon();
  }, [id]);
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, []);
  const getCoupon = () => {
    dispatch(getACoupon(id));
    dispatch({ type: "resetState" });
  };

  const {
    isSuccess,
    error,
    isLoading,
    editedCoupon,
  } = coupon;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponState?.name || "",
      value: couponState?.value || "",
      minAmount: couponState?.minAmount || "",
      maxAmount: couponState?.maxAmount || "",
      selectedProduct: couponState?.selectedProduct || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        dispatch(editCoupon(values,id));
        dispatch({ type: "resetState" });
    },
  });

  useEffect(() => {
    if (isSuccess && editedCoupon) {
      toast.success("Coupon Updated Successfullly!");
      navigate("/dashboard-coupouns");
    }

    if (error) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, error, isLoading]);

  return (
    <>
            <div className="w-[90%] 800px:w-[40%] h-[90vh] bg-white rounded-md shadow p-4">
                <h5 className="text-[30px] font-Poppins text-center">
                  Edit Coupon code
                </h5>
                {/* create coupoun code */}
                <form onSubmit={formik.handleSubmit} aria-required={true}>
                  <br />
                  <div>
                  <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}
                      label="Enter Coupon Name"
                      id="name"
                    />
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <br />
                  <div>
                  <label className="pb-2">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  <input
                      className="form-control"
                      type="number"
                      name="value"
                      onChange={formik.handleChange("value")}
                      onBlur={formik.handleBlur("value")}
                      value={formik.values.value}
                      label="Enter Discount Percentage"
                      id="value"
                    />
                    <div className="error">
                      {formik.touched.value && formik.errors.value}
                    </div>
                  </div>
                  <br />
                  <div>
                  <label className="pb-2">Min Eligible Amount
                  <span className="text-red-500">*</span>
                  </label>
                  <input
                      className="form-control"
                      type="number"
                      name="minAmount"
                      onChange={formik.handleChange("minAmount")}
                      onBlur={formik.handleBlur("minAmount")}
                      value={formik.values.minAmount}
                      label="Enter Min Eligible Amount"
                      id="minAmount"
                    />
                    <div className="error">
                      {formik.touched.minAmount && formik.errors.minAmount}
                    </div>
                  </div>
                  <br />
                  <div>
                  <label className="pb-2">Max Amount
                  <span className="text-red-500">*</span>
                  </label>
                  <input
                      className="form-control"
                      type="number"
                      name="maxAmount"
                      onChange={formik.handleChange("maxAmount")}
                      onBlur={formik.handleBlur("maxAmount")}
                      value={formik.values.maxAmount}
                      label="Enter Max Discount Amount"
                      id="maxAmount"
                    />
                    <div className="error">
                      {formik.touched.maxAmount && formik.errors.maxAmount}
                    </div>
                  </div>
                  <br />
                  <div>
                  <label className="pb-2">Select Product
                  <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="selectedProduct"
                    onChange={formik.handleChange("selectedProduct")}
                    onBlur={formik.handleBlur("selectedProduct")}
                    value={formik.values.selectedProduct}
                    className="form-control py-3 mb-3"
                    id="selectedProduct"
                  >
                    <option value="Choose a Product">
                        Choose a product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i._id} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                  </select>
                  <div className="error">
                    {formik.touched.selectedProduct && formik.errors.selectedProduct}
                  </div>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Edit Coupon"
                      className="button mt-3 ml-[140px] block w-[150px] border"
                    />
                  </div>
                </form>
              </div>
    </>
  );
};

export default EditCoupon;
