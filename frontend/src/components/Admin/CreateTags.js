import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTags } from "../../redux/actions/tags";
import { toast } from "react-toastify";

const CreateTags = () => {
  const { isSuccess, error, message } = useSelector((state) => state.tags);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message !== null) {
      toast.success("Tag created successfully!");
      dispatch({ type: "resetState" });
      setTimeout(() => {
        navigate("/admin/view-tags");
      }, 500);
    }
  }, [dispatch, error, isSuccess, message]);

  useEffect(() => {
    dispatch({ type: "resetState" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createTags({name: name}));
  };

  return (
    <div className="w-[90%] mt-[50px] 800px:w-[50%] bg-white  shadow h-[70vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Tags</h5>
      {/* create Tags form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2 mt-5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Tag name..."
            minLength={3}
            required
          />
        </div>
        <br />
        <div>
          <div>
            <input
              type="submit"
              value="Create Tag"
              className="button mt-[100px] mb-5 cursor-pointer appearance-none text-center block w-full px-3 h-[45px] rounded-[3px] sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTags;
