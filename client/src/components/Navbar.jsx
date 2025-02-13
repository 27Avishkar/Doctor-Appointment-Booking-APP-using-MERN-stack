import React from 'react'
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false); // for menu
  
  const { token, setToken, userData } = useContext(AppContext)

  // logout
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 md:mx-10">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer hover:scale-105 transition-all duration-400"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-8 font-medium">
        <NavLink to="/">
          <li className="py-1 hover:scale-105 transition-all duration-400">
            HOME
          </li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1 hover:scale-105 transition-all duration-400">
            ALL DOCTORS
          </li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1 hover:scale-105 transition-all duration-400">
            ABOUT
          </li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1 hover:scale-105 transition-all duration-400">
            CONTACT
          </li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {
        token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full shadow-neutral-800 hover:scale-105 shadow-lg transition-all duration-400"
              src={userData.image}
              alt=""
            />
            <img
              className="w-2.5 hover:scale-150 transition-all duration-400"
              src={assets.dropdown_icon}
              alt=""
            />

            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-800 z-20 hidden group-hover:block">
              <div className=" flex flex-col gap-4 min-w-48 bg-gray-100 rounded-2xl p-4">
                <p
                  onClick={() => navigate("/profile")}
                  className="mx-1 hover:text-black hover:scale-105 cursor-pointer transition-all duration-400"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="mx-1 hover:text-black hover:scale-105 cursor-pointer transition-all duration-400"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="mx-1 hover:text-black hover:scale-105 cursor-pointer transition-all duration-400"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-amber-500 text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400"
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden hover:scale-105"
          src={assets.menu_icon}
          alt=""
        />

        {/*  Mobile Menu */}
        <div
          className={`bg-white md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden transition-all ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7 hover:scale-105"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          <ul className="flex flex-col items-center mt-2 px-5 font-medium text-lg gap-2">
            <NavLink
              to={"/"}
              onClick={() => setShowMenu(false)}
            >
              <p className='px-4 py-2 rounded-2xl inline-block uppercase'>Home</p>
            </NavLink>
            <NavLink
              to={"/doctors"}
              onClick={() => setShowMenu(false)}
            >
              <p className='px-4 py-2 rounded-2xl inline-block uppercase'>All Doctors</p>
            </NavLink>
            <NavLink
              to={"/about"}
              onClick={() => setShowMenu(false)}
            >
              <p className='px-4 py-2 rounded-2xl inline-block uppercase'>About</p>
            </NavLink>
            <NavLink
              to={"/contact"}
              onClick={() => setShowMenu(false)}
            >
              <p className='px-4 py-2 rounded-2xl inline-block uppercase'>Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
