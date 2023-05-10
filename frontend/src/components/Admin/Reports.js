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
import { getAllProducts } from "../../redux/actions/product";
import { getAllCoupon } from "../../redux/actions/coupon";
import { getAllEvents } from "../../redux/actions/event";
import { getAllVendors } from "../../redux/actions/seller";
import { getAllUsers } from "../../redux/actions/user";
import { getAllBlogCategory } from "../../redux/actions/blogCategory";
import { getAllBlogs } from "../../redux/actions/blog";
import { getAllOrders } from "../../redux/actions/order";

const Reports = ({ active }) => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category?.allCategory);
    const isLoading = useSelector((state) => state.category?.isLoading);

    
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

      useEffect(() => {
        dispatch(getAllCategory());
        dispatch({ type: "resetState" });
      }, []);
    
      const columns = [
        { field: "id", headerName: "Category Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 160,
          flex: 1.0,
        },
        {
          field: "description",
          headerName: "Description",
          minWidth: 80,
          flex: 0.6,
        }
      ];
    
      const row = [];
    
      category &&
        category.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            description: item.description,
          });
        });

  return (
    <div className="w-full">
      {/* category */}
      {active === 2 && (
        <>
            <div className="ml-10 mt-5 flex">
                <h3>Category Report</h3>
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
      )}

      {/* brand */}
      {active === 3 && (
        <div>
          <BrandReport />
        </div>
      )}
      {/* tags */}
      {active === 4 && (
        <div>
          <TagsReport />
        </div>
      )}
      {/* products */}
      {active === 5 && (
        <div>
          <ProductReport />
        </div>
      )}
      {/* orders */}
      {active === 6 && (
        <div>
          <OrderReport />
        </div>
      )}
      {/* order datewise */}
      {active === 13 && (
        <div>
          <OrderDatewiseReport />
        </div>
      )}
      {/* events */}
      {active === 7 && (
        <div>
          <EventsReport />
        </div>
      )}
      {/* coupons */}
      {active === 8 && (
        <div>
          <CouponsReport />
        </div>
      )}
      {/* Blog Category */}
      {active === 9 && (
        <div>
          <BlogCategoryReport />
        </div>
      )}
      {/* blog */}
      {active === 10 && (
        <div>
          <BlogsReport />
        </div>
      )}
      {/* customers */}
      {active === 11 && (
        <div>
          <CustomersReport />
        </div>
      )}
      {/* vendors */}
      {active === 12 && (
        <div>
          <VendorsReport />
        </div>
      )}
    </div>
  );
};

const BrandReport = () => {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand?.allBrands);
    const isLoading = useSelector((state) => state.brand?.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllBrands());
        dispatch({ type: "resetState" });
      }, []);
    
      const columns = [
        { field: "id", headerName: "Brand Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 160,
          flex: 1.0,
        }
      ];
    
      const row = [];
    
      brands &&
        brands.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
          });
        });
        return (
            <div className="w-full">
              {/* brands */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Brands</h3>
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

const TagsReport = () => {
    const dispatch = useDispatch();
    const tags = useSelector((state) => state.tags?.allTags);
    const isLoading = useSelector((state) => state.tags?.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllTags());
        dispatch({ type: "resetState" });
      }, []);
    
      const columns = [
        { field: "id", headerName: "Tag Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 160,
          flex: 1.0,
        }
      ];
    
      const row = [];
    
      tags &&
        tags.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
          });
        });
        return (
            <div className="w-full">
              {/* tags */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Tags</h3>
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

const ProductReport = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products?.allProducts);
    const isLoading = useSelector((state) => state.products?.isLoading);

    
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
              {/* tags */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Tags</h3>
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

const OrderReport = () => {
    const dispatch = useDispatch();
    const orders  = useSelector((state) => state.order?.allOrders);
  const isLoading  = useSelector((state) => state.order.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch({ type: "resetState" });
      }, []);
    
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
                        <h3>Orders</h3>
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
  const orders  = useSelector((state) => state.order?.allOrders);
  const isLoading  = useSelector((state) => state.order.isLoading);

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
    dispatch(getAllOrders());
    dispatch({ type: "resetState" });
  }, []);
  
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


const EventsReport = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events?.allEvents);
    const isLoading = useSelector((state) => state.events?.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllEvents());
        dispatch({ type: "resetState" });
      }, []);
    
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
    const coupons = useSelector((state) => state.coupon?.allCoupon);
    const isLoading = useSelector((state) => state.coupon?.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllCoupon());
        dispatch({ type: "resetState" });
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

const BlogCategoryReport = () => {
    const dispatch = useDispatch();
    const blogCat = useSelector((state) => state.blogCat?.allBlogCats);
  const isLoading = useSelector((state) => state.blogCat?.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllBlogCategory());
        dispatch({ type: "resetState" });
      }, []);
    
      const columns = [
        { field: "id", headerName: "Blog Category Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 160,
          flex: 1.0,
        }
      ];
    
      const row = [];
    
      blogCat &&
        blogCat.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
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


const BlogsReport = () => {
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog?.allBlogs);
  const isLoading = useSelector((state) => state.blog?.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllBlogs());
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
            name: item?.name,
            category: item.category?.name,
            author: item.author?.name ? item.author?.name : "admin",
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

const CustomersReport = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user?.allUsers);
  const isLoading = useSelector((state) => state.user?.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch({ type: "resetState" });
      }, []);
    
      const columns = [
        { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 130,
          flex: 0.7,
        },
        {
          field: "email",
          headerName: "Email",
          type: "email",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "date",
          headerName: "Date",
          minWidth: 130,
          flex: 0.8,
        }
      ];
    
      const row = [];
    
      users &&
        users.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            email: item.email,
            date: item.createdAt?.slice(0,10),
          });
        });
    
        return (
            <div className="w-full">
              {/* Customers */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Customers</h3>
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

const VendorsReport = () => {
    const dispatch = useDispatch();
    const vendors = useSelector((state) => state.seller?.allVendors);
    const isLoading = useSelector((state) => state.seller?.isLoading);

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(getAllVendors());
        dispatch({ type: "resetState" });
      }, []);
    
      const columns = [
        { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "name",
          headerName: "Shop Name",
          minWidth: 130,
          flex: 0.7,
        },
        {
            field: "ownername",
            headerName: "Owner Name",
            minWidth: 130,
            flex: 0.7,
          },
        {
          field: "email",
          headerName: "Email",
          type: "email",
          minWidth: 130,
          flex: 0.7,
        },
        {
            field: "mobile",
            headerName: "Mobile No.",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
    
        {
          field: "date",
          headerName: "Date",
          minWidth: 130,
          flex: 0.8,
        }
      ];
    
      const row = [];
    
      vendors &&
        vendors.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            ownername: item.ownername,
            email: item.email,
            mobile: item.phoneNumber,
            date: item.createdAt.slice(0,10),
          });
        });
    
        return (
            <div className="w-full">
              {/* Customers */}
                <>
                    <div className="ml-10 mt-5 flex">
                        <h3>Vendor</h3>
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



export default Reports;