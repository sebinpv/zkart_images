import React from 'react'
import styles from '../../styles/styles'
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import DashboardFooter from '../../components/Admin/Layout/DashboardFooter';

const ShopHomePage = () => {
  return (
    <>
      
      <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={1} />
            </div>
              <div className="w-full justify-center flex">
                <div className={`${styles.section} bg-[#f5f5f5]`}>
                  <div className="w-full flex py-10 justify-between">
                    <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
                      <ShopInfo isOwner={true} />
                    </div>
                    <div className="w-[72%] rounded-[4px]">
                      <ShopProfileData isOwner={true} />
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <DashboardFooter/>
    </div>
    </>
  )
}

export default ShopHomePage