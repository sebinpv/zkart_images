import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ShopResetPassword from '../components/Password/ShopResetPassword';

const ShopResetPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  
  return (
    <div>
        <Header activeHeading={1} />
        <ShopResetPassword />
        <Footer />
    </div>
  )
}

export default ShopResetPasswordPage;