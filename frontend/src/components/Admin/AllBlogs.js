import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs, deleteBlog, getUserBlog } from "../../redux/actions/blog";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const AllBlogs = () => {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.user?.admin?._id);
  const blog = useSelector((state) => state.blog?.allBlogs);
  const ublog = useSelector((state) => state.blog?.userBlogs);
  const isLoading = useSelector((state) => state.blog?.isLoading);
  const {isSuccess, error, message} = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message!==null) {
      toast.success("Blog Deleted successfully!");
      dispatch(getAllBlogs());
      dispatch(getUserBlog(uid));
      dispatch({ type: "resetState" });
    }
  }, [dispatch, error, isSuccess, message]);

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getUserBlog(uid));
    dispatch({ type: "resetState" });
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

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

  blog &&
    blog.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        category: item.category.name,
        author: item.author?.name ? item.author?.name : "admin",
      });
    });

    const columns1 = [
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
  
    const row1 = [];
  
    ublog &&
      ublog.forEach((item) => {
        row1.push({
          id: item._id,
          name: item.name,
          category: item.category.name,
          author: item.author?.name ? item.author?.name : "admin",
        });
      });

  return (
    <>
    <div>
    <div className="ml-10 mt-5 flex">
        <h3>Blogs</h3>
        <Link to="/admin/create-blog" className="button ml-[750px] w-[150px] link">Create Blogs</Link>
    </div>
    <br/>
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
      <div>
    <div className="ml-10 mt-5 flex">
        <h3>Admin Blogs</h3>
    </div>
    <br/>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row1}
            columns={columns1}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </div>
    </div>
    
    </>
  );
};

export default AllBlogs;
