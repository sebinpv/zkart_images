import React from 'react'
import DashboardHeader from '../../components/Admin/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Admin/Layout/DashboardSideBar'
import DashboardFooter from "../../components/Admin/Layout/DashboardFooter";
import EditBrand from "../../components/Admin/EditBrand";

const AdminEditBrand = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={8} />
            </div>
            <div className="w-full justify-center flex">
                <EditBrand />
            </div>
          </div>
          <DashboardFooter/>
    </div>
  )
}

export default AdminEditBrand