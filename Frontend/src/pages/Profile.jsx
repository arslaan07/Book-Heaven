import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Home/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
import api from '../api';

const Profile = () => {
  //   const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  console.log(api)
  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(
        `api/v1/get-user-info`,
        { headers },
      );
      console.log(response.data.data)
      setProfile(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
      {!Profile && (
        <div className="w-full h-full flex items-center justify-center">
          {" "}
          <Loader />{" "}
        </div>
      )}
      {Profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={Profile}/>
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6 ">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
