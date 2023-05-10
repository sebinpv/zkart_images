import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getABrand } from "../../redux/actions/brand";
import { BiArrowBack } from "react-icons/bi";

const ViewBrand = () => {
  
    const brand = useSelector((state) => state.brand?.singleBrand);
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };

    useEffect(() => {
        getBrand();
      }, []);
      const getBrand = () => {
        dispatch(getABrand(id));
      };

  return (
    <>
    <div>
      <div className="w-[1000px] mt-5">
        <h3 className="mb-4 title">View Enquiry</h3>
        <div className="ml-[900px] flex">
        <button
          className="flex"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
        </div>
        
      </div>
      {brand ? (
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Brand Name:</h6>
          <p className="mb-0">{brand.name}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
        <img
                  src={`${backend_url}${brand.logo}`}
                  alt=""
                  className="w-[250px] h-[250px]"
                />
        </div>
      </div>
      ) : null}
    </div>
    
    </>
  );
};

export default ViewBrand;
