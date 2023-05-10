import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { getABlog } from "../../redux/actions/blog";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BlogDetails = () => {
  
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
    <div className="bg-white">
      {blog ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${blog.image}`}
                  alt=""
                  className="w-[80%]"
                />
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{blog.name}</h1>
                <p>{blog.description}</p>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default BlogDetails;
