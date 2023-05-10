import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
  AdminLoginPage,
  BlogDetailsCardPage,
  BlogDetailsPage,
  BlogsHomePage,
  ContactPage,
  ForgotPasswordPage,
  ResetpasswordPage,
  ShopResetPasswordPage,
  ShopForgotPasswordPage,
} from "./routes/Routes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopEditProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
  ShopAllBlogs,
  ShopEditBlog,
  ShopCreateBlog,
  ShopEditCouponPage,
  ShopEditEvent,
  ShopReports,
} from "./routes/ShopRoutes";
import { 
  AdminDashboardPage,
  AdminAllOrders,
  AdminAllProducts,
  AdminSettingsPage,
  AdminAllUsers,
  AdminAllVendors,
  AdminCreateBrand,
  AdminCreateCategory,
  AdminAllBrands,
  AdminAllCategory,
  AdminCreateTags,
  AdminAllTags,
  AdminCreateBlogCategory,
  AdminAllBlogCategory,
  AdminCreateBlog,
  AdminAllBlogs,
  AdminEditBrand,
  AdminAllEvents,
  AdminEditCategory,
  AdminEditBlogCat,
  AdminEditTags,
  AdminEditBlog,
  AdminAllEnquiry,
  AdminViewBrand,
  AdminViewEnquiry,
  AdminReports,
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser, loadAdmin } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(loadAdmin());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/reset-password/:reset_token"
          element={<ResetpasswordPage />}
        />
        <Route
          path="/shop/reset-password/:reset_token"
          element={<ShopResetPasswordPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/view-blog/:id" element={<BlogDetailsCardPage />} />
        <Route path="/viewblog/:id" element={<BlogDetailsPage />} />
        <Route path="/blogs-home" element={<BlogsHomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/shop/forgot-password" element={<ShopForgotPasswordPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-edit-product/:id"
          element={
            <SellerProtectedRoute>
              <ShopEditProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-blogs"
          element={
            <SellerProtectedRoute>
              <ShopAllBlogs />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/create-blog"
          element={
            <SellerProtectedRoute>
              <ShopCreateBlog />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/edit-blog/:id"
          element={
            <SellerProtectedRoute>
              <ShopEditBlog />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/edit-coupon/:id"
          element={
            <SellerProtectedRoute>
              <ShopEditCouponPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/edit-event/:id"
          element={
            <SellerProtectedRoute>
              <ShopEditEvent />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/reports"
          element={
            <SellerProtectedRoute>
              <ShopReports />
            </SellerProtectedRoute>
          }
        />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-orders"
          element={
            <AdminProtectedRoute>
              <AdminAllOrders />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-products"
          element={
            <AdminProtectedRoute>
              <AdminAllProducts />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminSettingsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-users"
          element={
            <AdminProtectedRoute>
              <AdminAllUsers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-vendors"
          element={
            <AdminProtectedRoute>
              <AdminAllVendors />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create-brand"
          element={
            <AdminProtectedRoute>
              <AdminCreateBrand />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create-category"
          element={
            <AdminProtectedRoute>
              <AdminCreateCategory />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/view-category"
          element={
            <AdminProtectedRoute>
              <AdminAllCategory />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/view-brands"
          element={
            <AdminProtectedRoute>
              <AdminAllBrands />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/view-brand/:id"
          element={
            <AdminProtectedRoute>
              <AdminViewBrand />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-brand/:id"
          element={
            <AdminProtectedRoute>
              <AdminEditBrand />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/view-tags"
          element={
            <AdminProtectedRoute>
              <AdminAllTags />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create-tags"
          element={
            <AdminProtectedRoute>
              <AdminCreateTags />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/view-blogcat"
          element={
            <AdminProtectedRoute>
              <AdminAllBlogCategory />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create-blogCategory"
          element={
            <AdminProtectedRoute>
              <AdminCreateBlogCategory />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/view-blogs"
          element={
            <AdminProtectedRoute>
              <AdminAllBlogs />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create-blog"
          element={
            <AdminProtectedRoute>
              <AdminCreateBlog />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/all-events"
          element={
            <AdminProtectedRoute>
              <AdminAllEvents />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/all-enquiry"
          element={
            <AdminProtectedRoute>
              <AdminAllEnquiry />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-category/:id"
          element={
            <AdminProtectedRoute>
              <AdminEditCategory />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-blogcat/:id"
          element={
            <AdminProtectedRoute>
              <AdminEditBlogCat />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-tags/:id"
          element={
            <AdminProtectedRoute>
              <AdminEditTags />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-blog/:id"
          element={
            <AdminProtectedRoute>
              <AdminEditBlog />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/view-enquiry/:id"
          element={
            <AdminProtectedRoute>
              <AdminViewEnquiry />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminProtectedRoute>
              <AdminReports />
            </AdminProtectedRoute>
          }
        />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
