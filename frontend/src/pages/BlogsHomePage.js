import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import BlogCard from "../components/Route/Blogs/BlogCard";
import styles from "../styles/styles";
import { getAllfBlogs } from "../redux/actions/blog";
import icon1 from "../images/gr4.svg";
import icon2 from "../images/gr3.svg";
import icon3 from "../images/gr2.svg";
import icon4 from "../images/gr.svg";


const BlogsHomePage = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(3);
  const isLoading = useSelector((state) => state.blog);
  const blogState = useSelector((state) => state.blog.allfBlogs);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  //Filter States
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState(null);

  let categoryId = [];

  useEffect(() => {
      const d = [];
      setData(d);
    //    window.scrollTo(0,0);
  }, []);

  useEffect(() => {

    let newCategory = [];
    for (let index = 0; index < blogState?.length; index++) {
      const element = blogState[index];
      newCategory.push(element.category);
    }
    setCategories(newCategory);

  }, [blogState]);

  useEffect(() => {
    getBlogs();
  }, [sort,category]);
  const getBlogs = () => {
    dispatch(getAllfBlogs({sort,category}));
  };

  return (
  <>
  {
    isLoading === true ? (
      <Loader />
    ) : (
      <div className="bg-slate-50">
        <Header activeHeading={3} />
      <br />
      <br />
        <div className="row">
          <div className="col-3">
          <div className="filter-card mb-3">
            <Link onClick={() => {window.location.reload(true)}} className="link text-center w-full button">Reset Filter</Link>
          </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By Category</h3>
              <div>
                <ul className="ps-0">
                  {
                    categories && [...new Set(categories)].map((item,index) => {
                      if(!categoryId.includes(item._id))
                      {
                        categoryId.push(item._id);
                        return(
                          <li key={index} onClick={()=>setCategory(item._id)}>{item.name}</li>
                        )
                      }
                    })
                  }
                </ul>
              </div>
            </div>

          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={(e)=>setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">
                      Alphabetically, Z-A
                    </option>
                    <option value="discountPrice">Price, low to high</option>
                    <option value="-discountPrice">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">{blogState?.length + "Products"}</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src={icon1}
                      className="w-5 h-5"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src={icon2}
                      className="w-5 h-5"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src={icon3}
                      className="w-5 h-5"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src={icon4}
                      className="w-5 h-5"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                    {blogState && blogState.map((i, index) => <BlogCard data={i} key={index} grid={grid}/>)}
                  
                  {blogState && blogState.length === 0 ? (
                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                      No products Found!
                    </h1>
                  ) : null}
                
              </div>
            </div>
          </div>
        </div>
      <div>
      <Footer />
    </div>
    </div>
    )
  }
  </>
  );
};

export default BlogsHomePage;
