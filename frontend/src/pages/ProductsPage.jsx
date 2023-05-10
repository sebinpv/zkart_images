import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { getAllProducts } from "../redux/actions/product";
import { getAllcProducts } from "../redux/actions/product";
import icon1 from "../images/gr4.svg";
import icon2 from "../images/gr3.svg";
import icon3 from "../images/gr2.svg";
import icon4 from "../images/gr.svg";


const ProductsPage = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(3);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const allProducts = useSelector((state) => state.products.allProducts);
  const isLoading = useSelector((state) => state.products);
  const productState = useSelector((state) => state.products.allcProducts);
  const [data, setData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  //Filter States
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  let brandId = [];
  let categoryId = [];
  let tagsId = [];

  useEffect(() => {
    if (categoryData === null) {
      const d = [];
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts]);

  useEffect(() => {
    if (categoryData === null) {
    let newBrands = [];
    let newCategory = [];
    let newTags = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      newCategory.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(newCategory);
    setTags(newTags);
  }
  }, [productState]);

  useEffect(() => {
    if (categoryData === null) {
    getProducts();}
  }, [sort,tag,brand,category,minPrice,maxPrice]);
  const getProducts = () => {
    if (categoryData === null) {
    dispatch(getAllcProducts({sort,tag,brand,category,minPrice,maxPrice}));}
  };

  useEffect(() => {
    getAllProducts();
  }, [allProducts]);

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
              <h3 className="filter-title">Shop By Categories</h3>
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
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e)=>setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e)=>setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  { 
                    brands && [...new Set(brands)].map((item,index) => {
                      
                      if(!brandId.includes(item?._id))
                      {
                        brandId.push(item?._id);
                        return(
                          <span key={index} onClick={()=>setBrand(item?._id)} className="badge bg-light text-secondary rounded-3 py-2 px-3">
                            {item?.name}
                          </span>
                        )
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {
                    tags && [...new Set(tags)].map((item,index) => {
                      if(!tagsId.includes(item._id))
                      {
                        tagsId.push(item._id);
                        return(
                          <span key={index} onClick={()=>setTag(item._id)} className="badge bg-light text-secondary rounded-3 py-2 px-3">
                            {item.name}
                          </span>
                        )
                      }
                    })
                  }
                </div>
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
                  <p className="totalproducts mb-0">{categoryData === null ? productState?.length + "Products" : data?.length + "Products"}</p>
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
                    {data && data.map((i, index) => <ProductCard data={i} key={index} grid={grid} />)}
                    {productState && productState.map((i, index) => <ProductCard data={i} key={index} grid={grid}/>)}
                  
                  {data && data.length === 0 && categoryData !== null ? (
                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                      No products Found!
                    </h1>
                  ) : null}

                  {productState && productState.length === 0 && categoryData !== null ? (
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

export default ProductsPage;
