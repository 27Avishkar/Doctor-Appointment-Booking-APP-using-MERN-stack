import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="lg:items-center lg:pl-[122px] lg:pr-[122px] md:mx-10">
      <div className="text-center text-2xl text-gray-500 font-medium">
        <p>
          CONTACT <span className="text-gray-700">US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row my-10 justify-center gap-10">
        <img
          className="w-full md:max-w-[360px] rounded-2xl shadow-2xl shadow-neutral-600"
          src={assets.contact_image}
          alt=""
        />

        <div className="mt-5">
          <p className=" text-lg font-medium">OUR OFFICE</p>
          <p className="text-sm pl-4 my-2">123 road, near ABC park,Mumbai</p>

          <p className="text-lg my-2">
            <span className="font-medium">Call:</span> +91 012-345-6789
          </p>

          <p className="text-lg my-2">
            <span className="font-medium">Mail:</span> doctime@gmail.com
          </p>

          <p className="text-lg my-2 font-medium">CAREERS AT DocTime</p>
          <p className="text-sm pl-4 my-2">
            Learn more about our teams and job openings!
          </p>

          <button className="bg-amber-500 text-white px-8 py-3 mt-6 rounded-full font-light cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
