import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import { AiOutlineEye } from "react-icons/ai";

const BlogCard = ({ data,isEvent }) => {

  return (
    <>
      <div className="w-[260px] h-[500px] ml-2 mr-3 mb-5 bg-[#d5d5d544] rounded-lg shadow-lg p-3 relative cursor-pointer border-2 border-black">
        <div className="product-image">
          <img
            src={`${backend_url}${data.image}`}
            alt=""
            className="w-[230px] h-[220px]"
          />
        </div>
          <h4 className="pb-3 mt-3 font-[400] text-black">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <p className="desc">
              {data.description.length > 40 ? data.description.slice(0, 40) + "..." : data.description}
              </p>
            </div>
          </div>
        <br/>
        <Link to={"/view-blog/"+data._id}>
        <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-[250px]"
            color="#333"
            title="Quick view"
          />
          </Link>
        <Link to={"/viewblog/"+data._id} className="button mt-2 ml-10 link">
          Read More
        </Link>
      </div>
    </>
  );
};

export default BlogCard;
