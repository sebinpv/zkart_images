import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard, RxHome } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const DashboardSideBar = ({ active }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`,{ withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full h-[130vh] bg-gray-700 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}

      <div className="w-full flex items-center p-4">
        <Link to="/admin-dashboard" className="w-full flex items-center link">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard-orders" className="w-full flex items-center link">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard-products" className="w-full flex items-center link">
          <FiPackage size={30} color={`${active === 3 ? "#dc4d14" : "rgb(249,247,247)"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin/dashboard-users"
          className="w-full flex items-center link"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard-vendors" className="w-full flex items-center link">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            All Vendors
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/all-events" className="w-full flex items-center link">
          <VscNewFile
            size={30}
            color={`${active === 6 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin/view-category"
          className="w-full flex items-center link"
        >
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Manage Category
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/view-brands" className="w-full flex items-center link">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Manage Brands
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/view-tags" className="w-full flex items-center link">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Manage Tags
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/view-blogcat" className="w-full flex items-center link">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Manage Blog Category
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/view-blogs" className="w-full flex items-center link">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 13 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 13 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Manage Blogs
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/all-enquiry" className="w-full flex items-center link">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 14 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 14 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Manage Enquiry
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/reports" className="w-full flex items-center link">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 15 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 15 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Reports
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/settings" className="w-full flex items-center link">
          <CiSettings
            size={30}
            color={`${active === 11 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link onClick={logoutHandler} className="w-full flex items-center link">
          <CiSettings
            size={30}
            color={`${active === 12 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 12 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Logout
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
