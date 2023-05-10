import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/user";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllUsers = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.user?.allUsers);
  const isLoading = useSelector((state) => state.user?.isLoading);
  const isSuccess = useSelector((state) => state.user?.isSuccess);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isSuccess !== true){
    dispatch(getAllUsers());}
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
      {
        field: "Edit",
        flex: 0.4,
        minWidth: 60,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Button onClick={() => handleEdit(params.id)}>
                <AiOutlineEdit size={20} />
              </Button>
            </>
          );
        },
      },
      {
        field: "Delete",
        flex: 0.5,
        minWidth: 60,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Button onClick={() => handleDelete(params.id)}>
                <AiOutlineDelete size={20} />
              </Button>
            </>
          );
        },
      },
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

export default AllUsers;
