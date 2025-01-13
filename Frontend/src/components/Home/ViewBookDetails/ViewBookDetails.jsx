import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import api from "../../../api";
import { toast } from "react-toastify";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(`api/v1/get-book-by-id/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    try {
      const response = await api.put(
        "api/v1/add-book-to-favorite",
        {},
        { headers }
      );
      toast.success(response.data.message, {
        theme: "dark",
      });
    } catch (error) {
      toast.error(error.message, {
        theme: "dark",
      });
    }
  };
  const handleCart = async () => {
    try {
      const response = await api.put("api/v1/add-to-cart", {}, { headers });
      toast.success(response.data.message, {
        theme: "dark",
      });
    } catch (error) {
      toast.error(error.message, {
        theme: "dark",
      });
    }
  };
  const deleteBook = async () => {
    try {
      const response = await api.delete("api/v1/delete-book", { headers });
      toast.success(response.data.message, {
        theme: "dark",
      });
      navigate("/all-books");
    } catch (error) {
      toast.error(error.message, {
        theme: "dark",
      });
    }
  };
  return (
    <div className="px-6 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      {Data && (
        <>
          {/* Image Section */}
          <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex flex-col md:flex-row items-center justify-center">
            <img
              src={Data.url}
              alt="Book Cover"
              className="h-[50vh] lg:h-[70vh] w-auto object-contain"
            />
            {isLoggedIn && role === "user" && (
              <div className="flex md:flex-col md:ms-4 md:gap-8 gap-4 mt-4 ">
                {/* Favorite Button */}
                <button
                  className="bg-white hover:bg-red-100 rounded-full md:rounded text-sm md:text-3xl
                 p-3 flex items-center gap-2 text-red-500 shadow-lg transition"
                  onClick={handleFavourite}
                >
                  <FaHeart />
                  <span className="md:hidden">Add to Favourite</span>
                </button>
                {/* Add to Cart Button */}
                <button
                  className="bg-white hover:bg-blue-100 rounded-full md:rounded text-sm md:text-3xl
                     p-3 flex items-center gap-2 text-blue-500 shadow-lg transition"
                  onClick={handleCart}
                >
                  <FaShoppingCart />
                  <span className="md:hidden">Add to Cart</span>
                </button>
              </div>
            )}
            {isLoggedIn && role === "admin" && (
              <div className="flex md:flex-col md:ms-4 md:gap-8 gap-4 mt-4 ">
                {/* Favorite Button */}
                <Link
                  to={`/update-book/${id}`}
                  className="bg-white hover:bg-blue-100 rounded-full md:rounded text-sm md:text-3xl p-3 flex items-center gap-2 text-blue-500 shadow-lg transition"
                >
                  <FaEdit />
                  <span className="md:hidden">Edit</span>
                </Link>
                {/* Add to Cart Button */}
                <button
                  onClick={deleteBook}
                  className="bg-white hover:bg-red-100 rounded-full md:rounded text-sm md:text-3xl p-3 flex items-center gap-2 text-red-500 shadow-lg transition"
                >
                  <MdOutlineDelete />
                  <span className="md:hidden">Delete Book</span>
                </button>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-3xl lg:text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="mt-1 text-zinc-400 font-semibold text-lg">
              by {Data.author}
            </p>
            <p className="mt-4 text-zinc-500 text-sm lg:text-lg">{Data.desc}</p>
            <p className="mt-4 flex items-center text-zinc-400">
              <GrLanguage className="mr-2" /> {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 font-bold text-2xl lg:text-3xl">
              Price: Rs. {Data.price}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBookDetails;
