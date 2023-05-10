import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllEnquiry, updateEnquiry } from "../../redux/actions/enquiry";
import { toast } from "react-toastify";

const ViewEnquiry = () => {
  
    const enquiry = useSelector((state) => state.enquiry?.allEnquiry);
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [enq, setEnq] = useState(null);
    const {isSuccess, error, message} = useSelector((state) => state.enquiry);

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
   
        const enqData = enquiry && enquiry.filter((item) => item._id === id);
        setEnq(enqData);
     }, [dispatch]);

     const setEnquiryStatus = (e, i) => {
        console.log(e, i);
        const data = { id: i, status: e };
        dispatch(updateEnquiry(data));
      };

  return (
    <>
    { enq &&
    <div>
      <div className="col-12 items-start mr-[900px] mt-5">
        <h3 className="mb-4 title">View Enquiry</h3>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enq[0]?.name}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+91${enq[0]?.mobile}`}>{enq[0]?.mobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${enq[0]?.email}`}>{enq[0]?.email}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enq[0]?.comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enq[0]?.status}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={enq[0]?.status ? enq[0]?.status : "Submitted"}
              className="form-control form-select"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, id)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default ViewEnquiry;
