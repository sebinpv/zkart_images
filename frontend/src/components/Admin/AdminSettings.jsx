import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadAdmin } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const navigate = useNavigate();
  const admin = useSelector((state) => state.user.admin);
  const [avatar,setAvatar] = useState();
  const [name,setName] = useState(admin && admin.name);
  const [email,setEmail] = useState(admin && admin.email);


  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    
    await axios.put(`${server}/user/update-admin-avatar`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }).then((res) => {
        dispatch(loadAdmin());
        toast.success("Avatar updated successfully!")
    }).catch((error) => {
        toast.error(error.response.data.message);
    })

  };

  const updateHandler = async (e) => {
    e.preventDefault();
    
    await axios.put(`${server}/user/update-admin-info`, {
        name,
        email,
    }, {withCredentials: true}).then((res) => {
        toast.success("Admin info updated succesfully!");
        dispatch(loadAdmin());
    }).catch((error)=> {
        toast.error(error.response.data.message);
    })
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`,{ withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${backend_url}/${admin.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Name</label>
            </div>
            <input
              type="name"
              placeholder={`${admin.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Email</label>
            </div>
            <input
              type="email"
              placeholder={`${
                admin?.email
                  ? admin.email
                  : "Enter Name"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>

          <div className="w-[100%] flex 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Profile"
              className={`button`}
              
              required
              readOnly
            />
            <input
              type="submit"
              value="Logout"
              className={`buttons ml-[180px]`}
              onClick={logoutHandler}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
