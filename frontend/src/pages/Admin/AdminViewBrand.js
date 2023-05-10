import React from "react";
import Footer from "../../components/Admin/Layout/DashboardFooter";
import ViewBrand from "../../components/Admin/ViewBrand";
import DashboardHeader from "../../components/Admin/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Admin/Layout/DashboardSideBar";

const AdminViewBrand = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={8} />
        </div>
        <ViewBrand />
      </div>
      <Footer/>
    </div>
  );
};

export default AdminViewBrand;