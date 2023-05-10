import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import BlogDetails from "../components/Blogs/BlogDetails";

const BlogDetailsPage = () => {

  return (
    <div>
      <Header />
      <BlogDetails />
      <Footer />
    </div>
  );
};

export default BlogDetailsPage;
