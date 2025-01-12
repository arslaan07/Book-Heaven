import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Home/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";
import api from '../api';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [loading, setLoading] = useState(true);
  const [userDiv, setuserDiv] = useState('hidden')
  const [userDivData, setuserDivData] = useState()
  
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${api}/get-all-orders`,
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const setOptionsButton = (i) => {
    setOptions(i);
  };

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    try {
      const id = AllOrders[i]._id;
      const response = await axios.put(
        `${api}/update-status/${id}`,
        Values,
        { headers }
      );

      alert(response.data.message);

      // Update the state directly after successful response
      const updatedOrders = [...AllOrders];
      updatedOrders[i].status = Values.status;
      setAllOrders(updatedOrders);

      setOptions(-1); // Reset options dropdown
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
    <div className="h-[100%] p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Your Order History
      </h1>
      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-2 flex gap-2">
        <div className="w-[3%]">
          <h1 className="text-center">Sr.</h1>
        </div>
        <div className="w-[40%] md:w-[22%]">
          <h1>Books</h1>
        </div>
        <div className="w-0 md:w-[45%] hidden md:block">
          <h1>Description</h1>
        </div>
        <div className="w-[17%] md:w-[9%]">
          <h1>Price</h1>
        </div>
        <div className="w-[30%] md:w-[16%]">
          <h1>Status</h1>
        </div>
        <div className="w-[10%] md:w-[5%]">
          <h1>
            <FaUserLarge />
          </h1>
        </div>
      </div>
      {AllOrders && AllOrders.map((items, i) => (
        <div
          key={i}
          className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
        >
          <div className="w-[3%]">
            <h1 className="text-center">{i + 1}</h1>
          </div>
          <div className="w-[40%] md:w-[22%]">
            <Link
              to={`/view-book-details/${items?._id}`}
              className="hover:text-blue-300"
            >
              {items?.book?.title || "No Title"}
            </Link>
          </div>
          <div className="w-0 md:w-[45%] hidden md:block">
            <h1 className="">
              {items?.book?.desc?.slice(0, 50) || "No Description"}...
            </h1>
          </div>
          <div className="w-[17%] md:w-[9%]">
            <h1 className="">Rs. {items?.book?.price || "N/A"}</h1>
          </div>
          <div className="w-[30%] md:w-[16%]">
            <h1 className="font-semibold">
              <button
                className="hover:scale-105 transition-all duration-300"
                onClick={() => setOptionsButton(i)}
              >
                <span
                  className={`${
                    items?.status === "Order placed"
                      ? "text-yellow-500"
                      : items?.status === "Canceled"
                      ? "text-red-500"
                      : items?.status === "Delivered"
                      ? "text-green-500"
                      : items?.status === "Out for delivery"
                      ? "text-blue-500"
                      : "text-gray-500"
                      
                  }`}
                >
                  {items?.status}
                </span>
              </button>
              {Options === i && (
  <div className="flex flex-col sm:flex-row mt-2 items-start sm:items-center">
    <select
      name="status"
      className="bg-gray-800 text-white p-2 rounded w-full sm:w-auto"
      onChange={change}
      value={Values.status}
    >
      {["Order placed", "Out for delivery", "Delivered", "Canceled"].map(
        (statusOption, index) => (
          <option key={index} value={statusOption}>
            {statusOption}
          </option>
        )
      )}
    </select>
    <button
      className="text-green-500 hover:text-pink-600 mt-2 sm:mt-0 sm:ml-2 flex-shrink-0"
      onClick={() => submitChanges(i)}
    >
      <FaCheck size={20} />
    </button>
  </div>
)}

            </h1>
          </div>
          <div className="w-[10%] md:w-[5%]">
            <button className="text-xl hover:text-orange-500" 
            onClick={() => {
                    setuserDiv('fixed')
                    setuserDivData(items.user)
                }}>
              <IoOpenOutline />
            </button>
          </div>
        </div>
      ))}
      
    </div>
    {
        userDivData && (
            <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />
        )
      }
    </>
  );
};

export default AllOrders;
