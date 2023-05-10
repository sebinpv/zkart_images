import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllEnquiry, updateEnquiry, deleteEnquiry } from "../../redux/actions/enquiry";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const AllEnquiry = () => {
  const navigate = useNavigate();
  const enquiry = useSelector((state) => state.enquiry?.allEnquiry);
  const isLoading = useSelector((state) => state.enquiry?.isLoading);
  const {isSuccess, error, message} = useSelector((state) => state.enquiry);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message!==null) {
      toast.success(message);
      dispatch(getAllEnquiry());
      dispatch({ type: "resetState" });
    }
  }, [dispatch, error, isSuccess, message]);

  useEffect(() => {
    dispatch(getAllEnquiry());
    dispatch({ type: "resetState" });
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteEnquiry(id));
  };

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, status: e };
    dispatch(updateEnquiry(data));
  };

  const columns = [
    { field: "id", headerName: "Enquiry Id", minWidth: 100, flex: 0.6 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "mobile",
      headerName: "Mobile No.",
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Query",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "status",
      flex: 0.8,
      minWidth: 60,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.status;
        const status = d.replace(/\s+/g, "-");
        return (
          <>
            <select
              name=""
              defaultValue={status ? status : "Submitted"}
              className="form-control form-select"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, params.id)}
            >
              <option disabled>{status ? status : ""}</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </>
        );
      },
    },
    {
      field: "Preview",
      flex: 0.4,
      minWidth: 60,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/admin/view-enquiry/${params.id}`}>
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
      flex: 0.4,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
            onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  enquiry &&
    enquiry.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        mobile: item.mobile,
        comment: item.comment,
        status: item.status,
      });
    });

  return (
    <>
    <div>
    <div className="ml-3 mt-5 flex">
        <h3>Enquiries</h3>
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

export default AllEnquiry;
