import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import EditCoupon from "../../components/Shop/EditCoupon";
import DashboardFooter from '../../components/Admin/Layout/DashboardFooter';

const ShopEditCouponPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <EditCoupon />
            </div>
          </div>
          <DashboardFooter/>
    </div>
  )
}

export default ShopEditCouponPage