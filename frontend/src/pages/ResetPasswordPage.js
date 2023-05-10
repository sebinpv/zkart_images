import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ResetPassword from '../components/Password/ResetPassword';

const ResetPasswordPage = () => {
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
        <ResetPassword />
        <Footer />
    </div>
  )
}

export default ResetPasswordPage;