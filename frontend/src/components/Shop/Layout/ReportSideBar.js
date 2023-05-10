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

const ReportSideBar = ({ setActive, active }) => {

  return (
    <div className="w-full h-[130vh] bg-gray-700 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center link">
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

      <div onClick={() => setActive(2)} className="w-full flex items-center p-4">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Product Report
          </h5>
      </div>

      <div onClick={() => setActive(3)} className="w-full flex items-center p-4">
          <FiPackage size={30} color={`${active === 3 ? "#dc4d14" : "rgb(249,247,247)"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Orders Report
          </h5>
      </div>

      <div onClick={() => setActive(4)} className="w-full flex items-center p-4">
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Events Report
          </h5>
      </div>

      <div onClick={() => setActive(5)} className="w-full flex items-center p-4">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Coupons Report
          </h5>
      </div>

      <div onClick={() => setActive(6)} className="w-full flex items-center p-4">
          <VscNewFile
            size={30}
            color={`${active === 6 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Blogs Report
          </h5>
      </div>

      <div onClick={() => setActive(7)} className="w-full flex items-center p-4">
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Orders Datewise Report
          </h5>
      </div>

      <div onClick={() => setActive(8)} className="w-full flex items-center p-4">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Coupons Report
          </h5>
      </div>

      <div onClick={() => setActive(9)} className="w-full flex items-center p-4">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Blog Category Report
          </h5>
      </div>

      <div onClick={() => setActive(10)} className="w-full flex items-center p-4">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Blogs Report
          </h5>
      </div>

      <div onClick={() => setActive(11)} className="w-full flex items-center p-4">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 11 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Customer Report
          </h5>
      </div>

      <div onClick={() => setActive(12)} className="w-full flex items-center p-4">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 12 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 12 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Vendor Report
          </h5>
      </div>

      <div onClick={() => setActive(13)} className="w-full flex items-center p-4">
          <CiSettings
            size={30}
            color={`${active === 13 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 13 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Settings
          </h5>
      </div>

      <div onClick={() => setActive(14)} className="w-full flex items-center p-4">
          <CiSettings
            size={30}
            color={`${active === 14 ? "#dc4d14" : "rgb(249,247,247)"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 14 ? "text-[#dc4d14]" : "text-[rgb(249,247,247)]"
            }`}
          >
            Logout
          </h5>
      </div>
    </div>
  );
};

export default ReportSideBar;
