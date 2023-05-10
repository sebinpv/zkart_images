import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import BlogDetailsCard from "../components/Route/Blogs/BlogDetailsCard";

const BlogDetailsCardPage = () => {

  return (
    <div>
      <Header />
      <BlogDetailsCard />
      <Footer />
    </div>
  );
};

export default BlogDetailsCardPage;
