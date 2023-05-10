import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { shopForgotPassword } from "../../redux/actions/seller";


const emailSchema = yup.object({
  email: yup.string().required ("Email is Required").email("Enter Valid Email"),
});

const ShopForgotPassword = () => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,

    onSubmit: (values) => {
      dispatch(shopForgotPassword(values));
      Navigate(`/`);
    }
  });

  return (
    <>
        <div className="row mt-5 mb-[150px]">
          <div className="col-12">
            <div className="auth-card shadow-lg">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form action=""  onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <input className="form-control" type="email" name="email" placeholder="Email"
                  value={formik.values.email} 
                  onChange={formik.handleChange("email")} 
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error ms-2 my-1">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default ShopForgotPassword;
