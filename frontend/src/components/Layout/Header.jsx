import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../../images/compare.svg";
import wishlisti from "../../images/wishlist.svg";
import useri from "../../images/user.svg";
import carti from "../../images/cart.svg";
import menu from "../../images/menu.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { getAllCategory } from "../../redux/actions/category";

const Header = ({ activeHeading }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const isAdmin = useSelector((state) => state.user.admin || 1);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const {allProducts} = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const productState = useSelector(state => state?.products?.allProducts);
  const [cartTotal, setCartTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);
  const navigate = useNavigate();

  const userCartState = useSelector((state) => state?.cart?.cart);
  const categoryState = useSelector((state) => state.category?.allCategory);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({id:index, prod:element?._id, name:element?.name});
    }
    setProductOpt(data);
  }, [productState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < categoryState?.length; index++) {
      const element = categoryState[index];
      data.push({id:element?._id, title:element?.name, image_Url:backend_url+element?.image});
    }
    setCategoryData(data);
  }, [categoryState]);

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      total = total + (Number(userCartState[index].qty * userCartState[index].discountPrice));
      setCartTotal(total);
    }
  }, [userCartState]);

  useEffect(() => {
    dispatch(getAllCategory());
  },[]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = allProducts && allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };
  

  return (
    <>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link style={{textDecoration: 'none'}} className="text-[#febd69]">ZKart</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group ">
                <Typeahead
                        className="form-control"
                        id="pagination-example"
                        onPaginate={() => console.log('Results paginated')}
                        onChange={(selected) => {
                            navigate(`/product/${selected[0]?.prod}`);
                            //dispatch(getAProduct(selected[0]?.prod))
                        }}
                        minLength={1}
                        options={productOpt}
                        paginate={paginate}
                        labelKey={"name"}
                        placeholder="Search for Products..."
                  />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link style={{textDecoration: 'none'}}
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={40} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#e69326] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
              <p onClick={() => setOpenWishlist(true)} className="mb-0 text-white">Wishlist</p>
            </div>
          </div>
                <div>
                  <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]">
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <img
                          src={`${backend_url}${user?.avatar}`}
                          className="w-[40px] h-[38px] rounded-full border-2 border-green-400"
                          alt=""
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile size={40} color="rgb(255 255 255 / 83%)" />
                      </Link>
                    )}
                  </div>
                  {isAuthenticated ? (
                      <p className="mb-0 text-white">Welcome<br/>{user.name}</p>
                    ) : (
                      <Link  style={{textDecoration: 'none'}} to="/login">
                        <p className="mb-0 text-white">Login</p>
                      </Link>
                    )}
                  
                </div>

              {/* cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/* wishlist popup */}
              {openWishlist ? (
                <Wishlist setOpenWishlist={setOpenWishlist} />
              ) : null}
                </div>
                <div>
                  <Link onClick={() => setOpenCart(true)} style={{textDecoration: 'none'}}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={carti} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{cart && cart.length}</span>
                      <p className="mb-0">Rs. {cartTotal ? cartTotal : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown border-1">
                    {/* categories */}
                    <div onClick={() => setDropDown(!dropDown)}>
                      <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                        <BiMenuAltLeft size={30} className="absolute top-3 left-1 fill-white" />
                        <button className="btn btn-secondary bg-transparent border-0 gap-15 d-flex align-items-center" type="button">
                            <span className="me-2 d-inline-block mt-2 ml-7">SHOP CATEGORIES</span>
                        </button>
                        <IoIosArrowDown
                          size={20}
                          className="absolute right-12 top-3 cursor-pointer fill-white"
                          onClick={() => setDropDown(!dropDown)}
                        />
                        {dropDown ? (
                          <DropDown
                            categoriesData={categoryData}
                            setDropDown={setDropDown}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    
                      {/* navitems */}
                      <div className={`${styles.noramlFlex}`}>
                        <Navbar active={activeHeading} />
                      </div>
                      
                    <NavLink className="flex" style={{textDecoration: 'none'}} to={`${isSeller ? '/dashboard' : '/shop-login'}`}>
                        {isSeller ? "Seller Dashboard" : "Seller Login"}  <IoIosArrowForward className=" mt-1" />
                    </NavLink>
                    {
                      isAdmin !== 1 ? <NavLink className="flex" style={{textDecoration: 'none'}} to="/admin-dashboard">ADMIN DASHBOARD</NavLink> : ""
                    }
                  </div>
                </div>
                <div className='menu-links'>
            
          </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
