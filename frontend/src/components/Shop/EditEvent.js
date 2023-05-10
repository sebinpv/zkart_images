import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editEvent } from "../../redux/actions/event";
import { getAllCategory } from "../../redux/actions/category";
import { getAllBrands } from "../../redux/actions/brand";
import { getAllTags } from "../../redux/actions/tags";
import { getAllEventsShop } from "../../redux/actions/event";

const EditEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const events = useSelector((state) => state.events.events);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [event,setEvent] = useState(null);
  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
    dispatch({ type: "resetState" });

    const eData = events && events.filter((item) => item._id === id);
    setEvent(eData[0]);
 }, [dispatch]);

  const [images, setImages] = useState([]);
  const [name, setName] = useState(event?.name);
  const [description, setDescription] = useState(event?.description);
  const [category, setCategory] = useState(event?.category);
  const [categoryData, setCategoryData] = useState([]);
  const [brand, setBrand] = useState(event?.brand);
  const [brandData, setBrandData] = useState([]);
  const [tags, setTags] = useState(event?.tags);
  const [tagsData, setTagsData] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(event?.originalPrice);
  const [discountPrice, setDiscountPrice] = useState(event?.discountPrice);
  const [stock, setStock] = useState(event?.stock);
  const [startDate,setStartDate] = useState(null);
  const [endDate,setEndDate] = useState(null);

  const categoryState = useSelector((state) => state.category?.allCategory);
  const brandState = useSelector((state) => state.brand?.allBrands);
  const tagsState = useSelector((state) => state.tags?.allTags);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < categoryState?.length; index++) {
      const element = categoryState[index];
      data.push({id:element?._id, title:element?.name});
    }
    setCategoryData(data);
  }, [categoryState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < brandState?.length; index++) {
      const element = brandState[index];
      data.push({id:element?._id, title:element?.name});
    }
    setBrandData(data);
  }, [brandState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < tagsState?.length; index++) {
      const element = tagsState[index];
      data.push({id:element?._id, title:element?.name});
    }
    setTagsData(data);
  }, [tagsState]);

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrands());
    dispatch(getAllTags());
  },[]);

 const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString().slice(0,10);
 }

 const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
     setEndDate(endDate);
 };
   
 const today = new Date().toISOString().slice(0,10);

 const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("brand", brand);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("Finish_Date", endDate.toISOString());
    dispatch(editEvent(newForm,id));
  };

  return (
    <>
    { event &&
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Edit Event</h5>
      {/* create event form */}
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
            placeholder="Enter your event product name..."
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
            placeholder="Enter your event product description..."
          ></textarea>
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
            Brand <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option value="Choose a Brand">Choose a Brand</option>
            {brandData &&
              brandData?.map((i) => (
                <option value={i.id} key={i.id}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Tags <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          >
            <option value="Choose a Tag">Choose a Tag</option>
            {tagsData &&
              tagsData?.map((i) => (
                <option value={i.id} key={i.id}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price..."
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your event product price with discount..."
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your event product stock..."
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0,10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleStartDateChange}
            min={today}
            placeholder="Enter your event product stock..."
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0,10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Enter your event product stock..."
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
            required
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Edit Event"
              className="mt-2 button text-center block w-full px-3 h-[50px] mb-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
    }
    </>
  );
};

export default EditEvent;
