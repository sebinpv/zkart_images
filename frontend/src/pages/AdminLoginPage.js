import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminLogin from "../components/Admin/AdminLogin";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { isAdmin,isLoading } = useSelector((state) => state?.user);

  useEffect(() => {
    if(isAdmin === true){
      navigate(`/admin-dashboard`);
    }
  }, [isLoading,isAdmin])
  return (
    <div>
        <Header activeHeading={1} />
        <AdminLogin />
        <Footer />
    </div>
  )
}

export default AdminLoginPage