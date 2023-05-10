import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllTags, deleteTags } from "../../redux/actions/tags";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const AllTags = () => {
  const navigate = useNavigate();
  const tags = useSelector((state) => state.tags?.allTags);
  const isLoading = useSelector((state) => state.tags?.isLoading);
  const {isSuccess, error, message} = useSelector((state) => state.tags);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message!==null) {
      toast.success("Tag Deleted successfully!");
      dispatch(getAllTags());
      dispatch({ type: "resetState" });
    }
  }, [dispatch, error, isSuccess, message]);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTags(id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-tags/${id}`);
  };

  const columns = [
    { field: "id", headerName: "Tag Id", minWidth: 150, flex: 0.7 },
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

  tags &&
    tags.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
      });
    });

  return (
    <>
    <div>
    <div className="ml-10 mt-5 flex">
        <h3>Tags</h3>
        <Link to="/admin/create-tags" className="button ml-[850px] link">Create Tags</Link>
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

export default AllTags;
