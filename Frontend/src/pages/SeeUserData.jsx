import React from 'react';
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      {/* Background overlay with blur */}
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-black bg-opacity-50 backdrop-blur-sm z-40`}
        onClick={() => setuserDiv('hidden')} // Close modal when clicking on overlay
      ></div>

      {/* Modal content */}
      <div
        className={`${userDiv}  fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50`}
      >
        <div className="bg-zinc-300 rounded p-6 w-[90%] md:w-[50%] lg:w-[40%] shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">
              User Information
            </h1>
            <button
              onClick={() => setuserDiv('hidden')}
              className="text-gray-600 hover:text-red-500 transition"
            >
              <RxCross1 size={24} className='font-semibold' />
            </button>
          </div>

          {/* User details */}
          <div className="mt-4">
            <p className="text-gray-700">
              <strong>Username:</strong> {userDivData.username || "N/A"}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Email:</strong> {userDivData.email || "N/A"}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Address:</strong> {userDivData.address || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
