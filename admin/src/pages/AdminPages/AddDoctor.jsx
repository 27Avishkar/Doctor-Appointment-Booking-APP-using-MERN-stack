import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddDoctor = () => {
  const [doctorImg, setDoctorImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { apiUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //check for image
      if (!doctorImg) {
        return toast.error("Image not selected!");
      }

      const formData = new FormData();

      formData.append("image", doctorImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      // const {data} = await axios.post(apiUrl+'/api/admin/add-doctor', formData, {headers:{ aToken }}) 

      // API call to add doctor
      const { data } = await axios.post(
        `${apiUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Doctor added successfully!");

        // Clear form fields
        setDoctorImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General Physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      }

      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full">
      <ToastContainer />
      <p className="text-lg font-medium text-center mb-3">Add Doctor</p>

      <div className="bg-white px-8 py-8 w-full max-w-4xl max-h-[80vh] border rounded-2xl overflow-y-scroll shadow-2xl">
        <div className="flex items-center mb-8 gap-5 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 cursor-pointer bg-gray-100 rounded-full"
              src={
                doctorImg ? URL.createObjectURL(doctorImg) : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(event) => setDoctorImg(event.target.files[0])}
          />
          <p>
            Upload doctor <br />
            image
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Left Side */}
          <div className="w-full flex flex-col lg:flex-1 gap-4">
            <div className="flex flex-col flex-1 gap-1">
              <p>Doctor Name</p>

              <input
                onChange={(event) => setName(event.target.value)}
                value={name}
                type="text"
                placeholder="Enter name"
                required
                className="px-3 py-1.5 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                required
                className="px-3 py-1.5 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <p>Password</p>
              <input
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                required
                className="px-3 py-1.5 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <p>Experience</p>
              <select
                onChange={(event) => setExperience(event.target.value)}
                value={experience}
                className="px-3 py-1.5 w-1/3 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <p>Fees</p>
              <input
                onChange={(event) => setFees(event.target.value)}
                value={fees}
                type="number"
                placeholder="Enter fees"
                min={0}
                required
                className="px-3 py-1.5 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full flex flex-col lg:flex-1 gap-4">
            <div className="flex flex-col flex-1 gap-1">
              <p>Speciality</p>
              <select
                onChange={(event) => setSpeciality(event.target.value)}
                value={speciality}
                className="px-3 py-1.5 w-2/3 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <p>Education</p>
              <input
                onChange={(event) => setDegree(event.target.value)}
                value={degree}
                type="text"
                placeholder="Enter education"
                required
                className="px-3 py-1.5 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <p>Address</p>
              <input
                onChange={(event) => setAddress1(event.target.value)}
                value={address1}
                type="text"
                placeholder="Enter address line 1"
                required
                className="px-3 py-1.5 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              />

              <input
                onChange={(event) => setAddress2(event.target.value)}
                value={address2}
                type="text"
                placeholder="Enter address line 2"
                required
                className="px-3 py-1.5 border border-gray-300 rounded-full shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(event) => setAbout(event.target.value)}
            value={about}
            placeholder="Enter about doctor"
            rows={3}
            required
            className="px-3 py-1.5 w-full border border-gray-300 rounded-2xl shadow-2xl shadow-neutral-500 hover:bg-stone-50 hover:shadow-2xs transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-3 mt-4 rounded-full font-light cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
