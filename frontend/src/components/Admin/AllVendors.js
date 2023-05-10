import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllVendors } from "../../redux/actions/seller";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllVendors = () => {
  const navigate = useNavigate();
  const vendors = useSelector((state) => state.seller?.allVendors);
  const isLoading = useSelector((state) => state.seller?.isLoading);
  const isSuccess = useSelector((state) => state.seller?.isSuccess);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isSuccess !== true){
    dispatch(getAllVendors());}
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const handleEdit = (id) => {
    navigate(`/dashboard-edit-product/${id}`);
  };

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
    },

    {
        field: "Preview",
        flex: 0.6,
        minWidth: 60,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          const d = params.row.name;
          const product_name = d.replace(/\s+/g, "-");
          return (
            <>
              <Link to={`/product/${params.id}`}>
                <Button>
                  <AiOutlineEye size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
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
        date: item.createdAt,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
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
  );
};

export default AllVendors;
