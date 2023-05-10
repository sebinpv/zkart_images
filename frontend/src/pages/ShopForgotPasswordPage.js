import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ShopForgotPassword from '../components/Password/ShopForgotPassword';

const ShopForgotPasswordPage = () => {
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
        <ShopForgotPassword />
        <Footer />
    </div>
  )
}

export default ShopForgotPasswordPage;