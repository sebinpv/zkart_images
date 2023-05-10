import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { shopResetPassword } from "../../redux/actions/seller";
import { toast } from "react-toastify";

const passwordSchema = yup.object({
  password: yup.string().required("Password is Required").min(6,"Password Should have Minimum 6 Characters"),
  cpassword: yup.string().required("Password is Required").min(6,"Password Should have Minimum 6 Characters"),
  });

const ShopResetPassword = () => {

const location = useLocation();
const navigate = useNavigate();
const getToken = location.pathname.split("/")[2];
const dispatch = useDispatch();
const [err, setError] = useState(false);
const {isSuccess, error, isLoading, message} = useSelector((state) => state.user);

useEffect(() => {
    if (isSuccess === false && isLoading === false && error !== null) {
      setError(true);
    }
    if (isSuccess === true && isLoading === false && message === "ok") {
        toast.success("Password Reset Successfull");
        navigate("/shop-login");
      }
  }, [dispatch, error, isSuccess, isLoading, message]);
  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: passwordSchema,

    onSubmit: (values) => {
      if(values.password === values.cpassword){
        dispatch(shopResetPassword({token:getToken, password: values.password}));
      }else{
        alert("Password doesnt Match");
      }
      
    }
  });

  return (
    <>
    {err && (
        <div class="container d-flex justify-content-center mb-[250px]">
            <div class="card shaodw-lg  card-1 w-[1000px] mt-[200px]">
                <div class="card-header pt-3 pb-0 ml-auto border-0 ">
                </div>
                <div class="card-body  d-flex pt-0">
                    <div class="row no-gutters  mx-auto justify-content-start flex-sm-row flex-column">
                        <div class="col-md-4  text-center"><img class="irc_mi img-fluid mr-0" src="https://cdn4.iconfinder.com/data/icons/logistics-delivery-2-5/64/137-512.png"  width="150" height="150"/></div>
                        <div class="col-md-6 ">
                            <div class="card border-0 ">
                                <div class="card-body">
                                    <h5 class="card-title "><b>{err ? (
                                        <p>Your token is expired!</p>
                                    ) : (
                                        ""
                                    )}</b></h5>
                                    <Link style={{textDecoration: 'none'}} to="/login" type="button" class="button">Login </Link>
                                </div>
                            </div>
                        </div>
                </div>
                </div> 
            </div>
        </div>
        )}
    {!err && (
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password} 
                  onChange={formik.handleChange("password")} 
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <input
                className="form-control"
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  value={formik.values.cpassword} 
                  onChange={formik.handleChange("cpassword")} 
                  onBlur={formik.handleBlur("cpassword")}
                />
                <div className="error">
                  {formik.touched.cpassword && formik.errors.cpassword}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        )}
    </>
  );
};

export default ShopResetPassword;
