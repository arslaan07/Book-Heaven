import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
        title: "Admin Profile",
        link: "/profile",
      },
  ];
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  else if(isLoggedIn && role === "admin") {
    links.splice(2,2)
  }
  else if(isLoggedIn && role === "user") {
    links.splice(4,1)
  }
  const [mobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">Book Heaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className={`hover:text-blue-500 transition-all duration-300 cursor-pointer ${
                  items.title === "Profile" || items.title === "Admin Profile"
                    ? "hover:bg-white hover:text-zinc-900 transition-all duration-300 border-2 border-blue-500 rounded-md px-2"
                    : ""
                }`}
                key={i}
              >
                {items.title}{" "}
              </Link>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}

          <button
            className="text-white text-2xl md:hidden hover:text-zinc-400 "
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full mb-8 z-40 flex flex-col items-center justify-center gap-8`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`hover:text-blue-500 transition-all text-white duration-300 cursor-pointer ${
              items.title === "Profile"
                ? "hover:bg-white hover:text-zinc-900 transition-all duration-300 border-2 border-blue-500 rounded-md px-2"
                : ""
            }`}
            key={i}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="/login" onClick={() => setMobileNav("hidden")}
              className="px-4 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to="/signup" onClick={() => setMobileNav("hidden")}
              className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
