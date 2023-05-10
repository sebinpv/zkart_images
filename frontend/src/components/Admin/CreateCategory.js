import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../redux/actions/category";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { RxImage } from "react-icons/rx";
import * as yup from "yup";

const CreateCategory = () => {
  const { isSuccess, error, message } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message !== null) {
      toast.success("Category created successfully!");
      dispatch({ type: "resetState" });
      setTimeout(() => {
        navigate("/admin/view-category");
      }, 2000);
    }
  }, [dispatch, error, isSuccess, message]);

  useEffect(() => {
    dispatch({ type: "resetState" });
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    newForm.append("file", images);
    newForm.append("name", name);
    newForm.append("description", description);
    dispatch(createCategory(newForm));
  };

  return (
    <div className="w-[90%] mt-[50px] 800px:w-[50%] bg-white  shadow h-[90vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Category</h5>
      {/* create category form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
            minLength={5}
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
            minLength={10}
          ></textarea>
        </div>
        <br />
        <div>
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
                  <span className="w-[150px]">Upload a file</span>
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
          <br />
          <div className="items-center">
            <input
              type="submit"
              value="Create Category"
              className="button mt-2 mb-5 cursor-pointer appearance-none text-center block w-full px-3 h-[45px] rounded-[3px] sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
