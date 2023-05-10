import React, { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../Layout/Loader";
import { getAllBrands } from "../../redux/actions/brand";
import { useReactToPrint } from 'react-to-print';
import { getAllCategory } from "../../redux/actions/category";
import { getAllTags } from "../../redux/actions/tags";
import { getAllProducts, getAllProductsShop } from "../../redux/actions/product";
import { getAllCoupon, getShopCoupon } from "../../redux/actions/coupon";
import { getAllEvents, getAllEventsShop } from "../../redux/actions/event";
import { getAllVendors } from "../../redux/actions/seller";
import { getAllUsers } from "../../redux/actions/user";
import { getAllBlogCategory } from "../../redux/actions/blogCategory";
import { getAllBlogs, getUserBlog } from "../../redux/actions/blog";
import { getAllOrders, getAllOrdersOfShop } from "../../redux/actions/order";

const Reports = ({ active }) => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
  });

  useEffect(() => {
      dispatch(getAllProducts());
      dispatch({ type: "resetState" });
    }, []);
  
    const columns = [
      { field: "id", headerName: "Product Id", minWidth: 100, flex: 0.4 },
      {
        field: "name",
        headerName: "Name",
        minWidth: 100,
        maxWidth: 150,
        flex: 0.8,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 80,
        flex: 0.6,
      },
      {
        field: "Stock",
        headerName: "Stock",
        type: "number",
        minWidth: 80,
        flex: 0.5,
      },
  
      {
        field: "sold",
        headerName: "Sold out",
        type: "number",
        minWidth: 80,
        flex: 0.6,
      }
    ];
  
    const row = [];
  
    products &&
      products.forEach((item) => {
        row.push({
          id: item._id,
          name: item.name,
          price: "Rs. " + item.discountPrice,
          Stock: item.stock,
          sold: item?.sold_out,
        });
      });

  return (
    <div className="w-full">
      {/* products */}
      {active === 2 && (
        <>
            <div className="w-full">
              {/* products */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Products Report</h3>
                        <button onClick={handlePrint} className="button ml-[800px] link">Print</button>
                    </div>
                    <br/>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div ref={componentRef} className="w-[1100px] mx-8 pt-1 mt-10 bg-white">
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                        </div>
                    )}
                </>
            </div>
        </>
      )}
      {/* orders */}
      {active === 3 && (
        <div>
          <OrderReport />
        </div>
      )}
      {/* events */}
      {active === 4 && (
        <div>
          <EventsReport />
        </div>
      )}
      {/* coupons */}
      {active === 5 && (
        <div>
          <CouponsReport />
        </div>
      )}
      {/* blog */}
      {active === 6 && (
        <div>
          <BlogsReport />
        </div>
      )}
      {/* order datewise */}
      {active === 7 && (
        <div>
          <OrderDatewiseReport />
        </div>
      )}
    </div>
  );
};


const OrderReport = () => {
    const dispatch = useDispatch();
    const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
      dispatch(getAllOrdersOfShop(seller._id));
    }, [dispatch]);
    
      const columns = [
        { field: "id", headerName: "Order ID", minWidth: 50, flex: 0.4 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 100,
          flex: 0.4,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 50,
          flex: 0.2,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 50,
          flex: 0.4,
        },
      ];
    
      const row = [];
    
      orders &&
        orders.forEach((item) => {
          row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "Rs. " + item.totalPrice,
            status: item.status,
          });
        });
        return (
            <div className="w-full">
              {/* Orders */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Orders Report</h3>
                        <button onClick={handlePrint} className="button ml-[850px] link">Print</button>
                    </div>
                    <br/>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div ref={componentRef} className="w-[1100px] mx-8 pt-1 mt-10 bg-white">
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                        </div>
                    )}
                </>
            </div>
          );
};

const EventsReport = () => {
    const dispatch = useDispatch();
    const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
      dispatch(getAllEventsShop(seller._id));
    }, [dispatch]);
    
      const columns = [
        { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 160,
          flex: 1.0,
        },
        {
          field: "price",
          headerName: "Price",
          minWidth: 80,
          flex: 0.6,
        },
        {
          field: "Stock",
          headerName: "Stock",
          type: "number",
          minWidth: 80,
          flex: 0.5,
        },
    
        {
          field: "sold",
          headerName: "Sold out",
          type: "number",
          minWidth: 80,
          flex: 0.6,
        },
    
        {
            field: "status",
            headerName: "Status",
            minWidth: 80,
            flex: 0.6,
          }
      ];
    
      const row = [];
    events && events.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            price: "Rs. " + item.discountPrice,
            Stock: item.stock,
            sold: item?.sold_out,
            status: item?.status,
          });
        });
        return (
            <div className="w-full">
              {/* Events */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Events</h3>
                        <button onClick={handlePrint} className="button ml-[850px] link">Print</button>
                    </div>
                    <br/>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div ref={componentRef} className="w-[1100px] mx-8 pt-1 mt-10 bg-white">
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                        </div>
                    )}
                </>
            </div>
          );
};

const CouponsReport = () => {
    const dispatch = useDispatch();
    const coupons = useSelector((state) => state.coupon?.shopCoupon);
    const isLoading = useSelector((state) => state.coupon?.isLoading);
    const { seller } = useSelector((state) => state.seller);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
      dispatch(getShopCoupon(seller._id));
    }, []);
    
      const columns = [
        { field: "id", headerName: "Id", minWidth: 50, flex: 0.7 },
        {
          field: "name",
          headerName: "Coupon Code",
          minWidth: 150,
          flex: 0.6,
        },
        {
          field: "discount",
          headerName: "Discount %",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "minprice",
          headerName: "Eligible Price",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "maxprice",
          headerName: "Max Discount",
          minWidth: 100,
          flex: 0.6,
        }
      ];
    
      const row = [];
    
      coupons &&
      coupons.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            discount: item.value + " %",
            minprice: item.minAmount,
            maxprice: item.maxAmount,
          });
        });
        return (
            <div className="w-full">
              {/* Coupons */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Coupons</h3>
                        <button onClick={handlePrint} className="button ml-[850px] link">Print</button>
                    </div>
                    <br/>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div ref={componentRef} className="w-[1100px] mx-8 pt-1 mt-10 bg-white">
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                        </div>
                    )}
                </>
            </div>
          );
};


const BlogsReport = () => {
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog?.userBlogs);
  const isLoading = useSelector((state) => state.blog?.isLoading);
  const { seller } = useSelector((state) => state.seller);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
      dispatch(getUserBlog(seller._id));
      dispatch({ type: "resetState" });
    }, []);
    
      const columns = [
        { field: "id", headerName: "Blog Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 160,
          flex: 1.0,
        },
        {
          field: "category",
          headerName: "Category",
          minWidth: 80,
          flex: 0.6,
        },
        {
          field: "author",
          headerName: "Posted By",
          minWidth: 80,
          flex: 0.5,
        }
      ];
    
      const row = [];
    
      blog &&
        blog.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            category: item.category.name,
            author: item.author.name,
          });
        });
        return (
            <div className="w-full">
              {/* Blog Category */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Blog Category</h3>
                        <button onClick={handlePrint} className="button ml-[850px] link">Print</button>
                    </div>
                    <br/>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div ref={componentRef} className="w-[1100px] mx-8 pt-1 mt-10 bg-white">
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                        </div>
                    )}
                </>
            </div>
          );
};


const OrderDatewiseReport = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const today = new Date().toISOString().slice(0,10);

  const [startDate,setStartDate] = useState(null);
  const [endDate,setEndDate] = useState(null);
  const [Orders,setOrders] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    setStartDate(startDate);
    let filter = orders.filter((order)=>{
      let orDate = new Date(order["createdAt"]);
      return(orDate>= startDate);
    })
    setOrders(filter);
 }

 const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
     setEndDate(endDate);
     let filter = orders.filter((order)=>{
      let orDate = new Date(order["createdAt"]);
      return(orDate<= endDate);
    })
    setOrders(filter);
 };

  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 50, flex: 0.4 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 100,
        flex: 0.4,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 50,
        flex: 0.2,
      },
  
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 50,
        flex: 0.4,
      },
    ];
  
    const row = [];
  
    Orders &&
      Orders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "Rs. " + item.totalPrice,
          status: item.status,
        });
      });
      return (
          <div className="w-full">
            {/* Orders */}
              <>
                  <div className="ml-10 mt-5 flex">
                      <h3>Orders Datewise Report</h3>
                      <button onClick={handlePrint} className="button ml-[700px] link">Print</button>
                  </div>
                  <div className="ml-[150px] mr-[150px] mt-10">
                    <form>
                    <div className="col-12">
                      <label className="pb-2">
                        From Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="createdAt"
                        id="start-date"
                        value={startDate ? startDate.toISOString().slice(0,10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleStartDateChange}
                        placeholder="Enter your event product stock..."
                      />
                    </div>
                    <br />
                    <div className="col-12">
                      <label className="pb-2">
                        To Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="createdAt"
                        id="end-date"
                        value={endDate ? endDate.toISOString().slice(0,10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleEndDateChange}
                        max={today}
                        placeholder="Enter your event product stock..."
                      />
                    </div>
                    <br />
                    </form>
                  </div>
                  <br/>
                  {isLoading ? (
                      <Loader />
                  ) : (
                      <div ref={componentRef} className="w-[1100px] mx-8 pt-1 mt-10 bg-white">
                      <DataGrid
                          rows={row}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          autoHeight
                      />
                      </div>
                  )}
              </>
          </div>
        );
};


export default Reports;