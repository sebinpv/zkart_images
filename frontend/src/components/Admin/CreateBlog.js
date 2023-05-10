import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../redux/actions/blog";
import { toast } from "react-toastify";
import { RxImage } from "react-icons/rx";
import { getAllBlogCategory } from "../../redux/actions/blogCategory";

const CreateBlog = () => {
  const { isSuccess, error, message } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [categoryData, setCategoryData] = useState([]);

  const categoryState = useSelector((state) => state.blogCat?.allBlogCats);
  const userState = useSelector((state) => state.user.admin);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < categoryState?.length; index++) {
      const element = categoryState[index];
      data.push({id:element?._id, title:element?.name});
    }
    setCategoryData(data);
  }, [categoryState]);

  useEffect(() => {
    dispatch(getAllBlogCategory());
  },[]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "resetState" });
    }
    if (isSuccess && message !== null) {
      toast.success("Blog created successfully!");
      dispatch({ type: "resetState" });
      setTimeout(() => {
        navigate("/admin/view-blogs");
      }, 500);
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
    newForm.append("category", category);
    newForm.append("author", userState._id);
    dispatch(createBlog(newForm));
  };

  return (
    <div className="w-[90%] mt-[50px] 800px:w-[50%] bg-white  shadow h-[100vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Blog</h5>
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
            min={5}
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Choose a category">Choose a category</option>
            {categoryData &&
              categoryData?.map((i) => (
                <option value={i.id} key={i.id}>
                  {i.title}
                </option>
              ))}
          </select>
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
                  <span className="w-[150px]">Upload a Image</span>
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
          <div>
            <input
              type="submit"
              value="Create Blog"
              className="button mt-2 mb-5 cursor-pointer appearance-none text-center block w-full px-3 h-[45px] rounded-[3px] sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
