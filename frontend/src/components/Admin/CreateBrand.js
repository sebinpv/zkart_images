import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBrand } from "../../redux/actions/brand";
import { toast } from "react-toastify";
import { RxImage } from "react-icons/rx";

const CreateBrand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isSuccess, error, message} = useSelector((state) => state.brand);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message !== null) {
      toast.success("Brand created successfully!");
      dispatch({ type: "resetState" });
      setTimeout(() => {
        navigate("/admin/view-brands");
      }, 500);
    }
  }, [dispatch, error, isSuccess, message]);

  useEffect(() => {
    dispatch({ type: "resetState" });
  }, []);

  const [images, setImages] = useState();
  const [name, setName] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    newForm.append("file", images);
    newForm.append("name", name);
    dispatch(createBrand(newForm));
  };

  return (
    <div className="w-[90%] mt-[50px] 800px:w-[50%] bg-white  shadow h-[70vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Brand</h5>
      {/* create Brand form */}
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
            placeholder="Enter brand name..."
            minLength={2}
            required
          />
        </div>
        <br />
        <div>
          
          <br />
          <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 mb-4 flex items-center">
                <span className="inline-block h-20 w-20 overflow-hidden">
                  {images ? (
                    <img
                      src={URL.createObjectURL(images)}
                      alt="avatar"
                      className=" object-cover"
                    />
                  ) : (
                    <RxImage className="h-8 w-8 mt-3 ml-3" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 mb-3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span className="w-[150px]">Upload Logo</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                    required
                  />
                </label>
              </div>
            </div>
          <div>
            <input
              type="submit"
              value="Create Brand"
              className="button mt-[100px] mb-5 cursor-pointer appearance-none text-center block w-full px-3 h-[45px] rounded-[3px] sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;
