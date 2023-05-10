import React from "react";
import Footer from "../../components/Admin/Layout/DashboardFooter";
import AdminSettings from "../../components/Admin/AdminSettings";
import DashboardHeader from "../../components/Admin/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Admin/Layout/DashboardSideBar";

const AdminSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <AdminSettings />
      </div>
      <Footer/>
    </div>
  );
};

export default AdminSettingsPage;
