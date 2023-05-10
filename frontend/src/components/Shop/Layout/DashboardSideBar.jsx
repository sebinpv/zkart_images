import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
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
  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`,{
      withCredentials: true,
    });
    window.location.reload();
  };
  return (
    <div className="w-full h-[100vh] bg-gray-700 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link style={{textDecoration: 'none'}} to="/dashboard" className="w-full flex items-center link">
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
        <Link to="/dashboard-orders" className="w-full flex items-center link">
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
        <Link to="/dashboard-products" className="w-full flex items-center link">
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
          to="/dashboard-create-product"
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
            Create Product
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center link">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center link">
          <VscNewFile
            size={30}
            color={`${active === 6 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-blogs" className="w-full flex items-center link">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 12 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 12 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Manage Blogs
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
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
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center link">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupouns" className="w-full flex items-center link">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center link">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/shop/reports" className="w-full flex items-center link">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 13 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 13 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Reports
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center link">
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
