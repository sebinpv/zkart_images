import React, { useState } from "react";
import Footer from "../../components/Shop/Layout/DashboardFooter";
import Reports from "../../components/Shop/Reports";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ReportSideBar from "../../components/Shop/Layout/ReportSideBar";
import { useSelector } from "react-redux";

const ShopReports = () => {
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

export default ShopReports;
