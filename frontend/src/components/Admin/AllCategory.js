import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategory, deleteCategory } from "../../redux/actions/category";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const AllCategory = () => {
  const navigate = useNavigate();
  const category = useSelector((state) => state.category?.allCategory);
  const isLoading = useSelector((state) => state.category?.isLoading);
  const {isSuccess, error, message} = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message!==null) {
      toast.success("Category Deleted successfully!");
      dispatch(getAllCategory());
      dispatch({ type: "resetState" });
    }
  }, [dispatch, error, isSuccess, message]);

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch({ type: "resetState" });
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

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

  category &&
    category.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        description: item.description,
      });
    });

  return (
    <>
    <div>
    <div className="ml-10 mt-5 flex">
        <h3>Categories</h3>
        <Link to="/admin/create-category" className="button ml-[700px] w-[180px] link">Create Category</Link>
    </div>
    <br/>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[1100px] mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </div>
    </>
  );
};

export default AllCategory;
