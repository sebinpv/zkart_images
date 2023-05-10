import React from "react";
import Footer from "../../components/Admin/Layout/DashboardFooter";
import ViewEnquiry from "../../components/Admin/ViewEnquiry";
import DashboardHeader from "../../components/Admin/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Admin/Layout/DashboardSideBar";

const AdminViewEnquiry = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={14} />
        </div>
        <ViewEnquiry />
      </div>
      <Footer/>
    </div>
  );
};

export default AdminViewEnquiry;