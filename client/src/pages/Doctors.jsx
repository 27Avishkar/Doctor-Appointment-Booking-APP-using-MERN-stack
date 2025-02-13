import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  // console.log(speciality);
  const { doctors } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [doc, setDoc] = useState([]); // for doctors list

  // check doctor speciality and show accordingly
  const docList = () => {
    if (speciality) {
      setDoc(doctors.filter((dr) => dr.speciality === speciality));
    } else {
      setDoc(doctors);
    }
  };

  // if speciality changes
  useEffect(() => {
    docList();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Search by the Doctor&apos;s Speciality</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`text-sm border border-gray-300 rounded-2xl shadow-lg px-3 py-1 hover:scale-105 hover:shadow-2xs transition-all duration-300 sm:hidden ${
            showFilter ? "bg-stone-100 text-gray-500" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        <div
          className={`flex-col text-sm text-gray-800 font-medium gap-6 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {/* dynamic styling */}
          <p
            onClick={() =>
              speciality === "General Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General Physician")
            }
            className={`w-[94vw] sm:w-auto pl-4 pr-12 py-1.5 mt-5 border border-gray-300 rounded-full transition-all duration-300 cursor-pointer shadow-xl shadow-neutral-400 hover:scale-105 hover:bg-emerald-200 hover:shadow-xs hover:border-gray-500 ${
              speciality === "General Physician"
                ? "bg-emerald-200 text-black not-hover:scale-105"
                : ""
            }`}
          >
            General Physician
          </p>

          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-4 pr-12 py-1.5 border border-gray-300 rounded-full shadow-xl shadow-neutral-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-emerald-200 hover:shadow-xs hover:border-gray-500 ${
              speciality === "Gynecologist"
                ? "bg-emerald-200 text-black not-hover:scale-105"
                : ""
            }`}
          >
            Gynecologist
          </p>

          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-4 pr-12 py-1.5 border border-gray-300 rounded-full shadow-xl shadow-neutral-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-emerald-200 hover:shadow-xs hover:border-gray-500 ${
              speciality === "Dermatologist"
                ? "bg-emerald-200 text-black not-hover:scale-105"
                : ""
            }`}
          >
            Dermatologist
          </p>

          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-4 pr-12 py-1.5 border border-gray-300 rounded-full shadow-xl shadow-neutral-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-emerald-200 hover:shadow-xs hover:border-gray-500 ${
              speciality === "Pediatricians"
                ? "bg-emerald-200 text-black not-hover:scale-105"
                : ""
            }`}
          >
            Pediatricians
          </p>

          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-4 pr-12 py-1.5 border border-gray-300 rounded-full shadow-xl shadow-neutral-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-emerald-200 hover:shadow-xs hover:border-gray-500 ${
              speciality === "Neurologist"
                ? "bg-emerald-200 text-black not-hover:scale-105"
                : ""
            }`}
          >
            Neurologist
          </p>

          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-4 pr-12 py-1.5 border border-gray-300 rounded-full shadow-xl shadow-neutral-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-emerald-200 hover:shadow-xs hover:border-gray-500 ${
              speciality === "Gastroenterologist"
                ? "bg-emerald-200 text-black not-hover:scale-105"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>

        {/*  Doctors List */}
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 pt-5 gap-y-6 px-3 sm:px-0 items-center">
          {doc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-sky-400  rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-5px] shadow-neutral-400 shadow-2xl hover:shadow-xl hover:border-sky-800 transition-all duration-400"
            >
              <img
                className="bg-teal-300 rounded-2xl"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <div
                  className={`flex items-center text-sm text-center  gap-2 ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? " bg-green-500" : "bg-red-500"
                    } rounded-full hover:scale-110 transition-all duration-300`}
                  ></p>{" "}
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-700 text-lg font-medium hover:text-gray-900 transition-all duration-300">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm hover:text-gray-800 transition-all duration-300">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
