import React, { useState } from "react";
import Footer from "../../components/Admin/Layout/DashboardFooter";
import Reports from "../../components/Admin/Reports";
import DashboardHeader from "../../components/Admin/Layout/DashboardHeader";
import ReportSideBar from "../../components/Admin/Layout/ReportSideBar";
import { useSelector } from "react-redux";

const AdminReports = () => {
  const { loading } = useSelector((state) => state.user.admin);
  const [active, setActive] = useState(2);
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ReportSideBar active={active} setActive={setActive} />
        </div>
        <Reports active={active} />
      </div>
      <Footer/>
    </div>
  );
};

export default AdminReports;
