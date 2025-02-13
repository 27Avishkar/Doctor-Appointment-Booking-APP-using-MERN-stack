// import React from 'react'
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-teal-400 rounded-2xl px-6 md:px-10 md:mx-10 lg:px-20 shadow-neutral-700 shadow-xl mb-10 hover:shadow-lg">
      {/* Left Side */}
      <div className="flex flex-col items-start justify-center md:w-1/2 gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          Secure Your Health <br className="hidden md:block" />
          with a Click !
        </p>
        <div className="flex flex-col md:flex-row items-center md:self-auto sm:self-center gap-3 text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Seamless doctor appointments at your fingertips{" "}
            <br className="hidden sm:block" />
            connect with trusted experts for quality healthcare anytime!
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white  px-8 py-3 rounded-full font-semibold text-gray-700 text-sm m-auto md:m-0 hover:scale-105 shadow-neutral-600 shadow-xs hover:shadow-xl transition-all duration-400 "
        >
          Book appointment
          <img className="w-4" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full h-auto md:absolute bottom-0 rounded-2xl"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
