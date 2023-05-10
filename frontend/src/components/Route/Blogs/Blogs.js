import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/styles";
import BlogCard from "./BlogCard";
import { getAllBlogs } from "../../../redux/actions/blog";

const Blogs = () => {
    const dispatch = useDispatch();
    const {allProducts} = useSelector((state) => state.products);
    const blogState = useSelector((state) => state.blog.allBlogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  },[])
   
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Blogs</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {blogState &&
            blogState.map((i, index) => <BlogCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
