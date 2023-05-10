import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import EditEvent from "../../components/Shop/EditEvent";
import DashboardFooter from '../../components/Admin/Layout/DashboardFooter';

const ShopEditEvent = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <EditEvent />
            </div>
          </div>
          <DashboardFooter/>
    </div>
  )
}

export default ShopEditEvent;