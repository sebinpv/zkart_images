import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ForgotPassword from '../components/Password/ForgotPassword';

const ForgotPasswordPage = () => {
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
        <ForgotPassword />
        <Footer />
    </div>
  )
}

export default ForgotPasswordPage;