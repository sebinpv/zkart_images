import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogCategory, deleteBcat } from "../../redux/actions/blogCategory";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const AllBlogCategory = () => {
  const navigate = useNavigate();
  const blogCat = useSelector((state) => state.blogCat?.allBlogCats);
  const isLoading = useSelector((state) => state.blogCat?.isLoading);
  const {isSuccess, error, message} = useSelector((state) => state.blogCat);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message!==null) {
      toast.success("Blog Category Deleted successfully!");
      dispatch(getAllBlogCategory());
      dispatch({ type: "resetState" });
    }
  }, [dispatch, error, isSuccess, message]);

  useEffect(() => {
    dispatch(getAllBlogCategory());
    dispatch({ type: "resetState" });
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteBcat(id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blogcat/${id}`);
  };

  const columns = [
    { field: "id", headerName: "Blog Category Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 160,
      flex: 1.0,
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

  blogCat &&
    blogCat.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
      });
    });

  return (
    <>
    <div>
    <div className="ml-10 mt-5 flex">
        <h3>Blog Category</h3>
        <Link to="/admin/create-blogCategory" className="button ml-[700px] link">Create Blog Category</Link>
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

export default AllBlogCategory;
