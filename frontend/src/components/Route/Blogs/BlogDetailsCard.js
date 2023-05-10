import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../../../redux/actions/blog";

const BlogDetailsCard = () => {
    const blog = useSelector((state) => state?.blog?.singleBlog);
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    useEffect(() => {
      getBlog();
    }, []);
    const getBlog = () => {
      dispatch(getABlog(getBlogId));
    };

  return (
    <div className="bg-[#fff]">
      {blog ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${blog.image}`}
                  alt=""
                />
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {blog.name}
                </h1>
                <p>{blog.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BlogDetailsCard;
