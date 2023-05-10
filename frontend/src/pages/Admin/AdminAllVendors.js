import React from 'react'
import DashboardHeader from '../../components/Admin/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Admin/Layout/DashboardSideBar'
import AllVendors from "../../components/Admin/AllVendors";
import DashboardFooter from '../../components/Admin/Layout/DashboardFooter';

const AdminAllVendors = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <AllVendors />
            </div>
          </div>
          <DashboardFooter/>
    </div>
  )
}

export default AdminAllVendors