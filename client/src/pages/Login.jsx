import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const { apiUrl, token, setToken } = useContext(AppContext)

  const [status, setStatus] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //check state if register or login
      if (status === 'Sign Up') {
        
        const {data} = await axios.post(`${apiUrl}/api/user/register`, { name, password, email})

        //check data
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(`${apiUrl}/api/user/login`, { password, email})

        //check data
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  // if token changes
  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])


  return (
    <form onSubmit={handleSubmit} className="flex items-center min-h-[80vh]">

      <div className="flex flex-col gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-2xl text-zinc-700 shadow-2xl shadow-neutral-500">

        <p className="text-center text-2xl font-semibold">
          {status === "Sign Up" ? "Create Account" : "Welcome back!"}
        </p>

        <p className="text-sm">
          Please {status === "Sign Up" ? "sign-up" : "log-in"} to book an
          Appointment
        </p>

        {status === "Sign Up" ? (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
              className="border border-gray-300 rounded-xl shadow-xs hover:shadow-xl shadow-neutral-500 w-full py-2 px-3 m-1 hover:bg-stone-100 hover:scale-105 transition-all duration-400"
            />
          </div>
        ) : (
          ""
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            className="border border-gray-300 rounded-xl shadow-xs hover:shadow-xl shadow-neutral-500 w-full py-2 px-3 m-1 hover:bg-stone-100 hover:scale-105 transition-all duration-400"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
            className="border border-gray-300 rounded-xl shadow-xs hover:shadow-xl shadow-neutral-500 w-full py-2 px-3 m-1 hover:bg-stone-100 hover:scale-105 transition-all duration-400"
          />
        </div>

        <button type="submit" className="bg-amber-500 text-white px-8 py-3 mt-6 mx-auto rounded-full font-light  cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400">
          {status === "Sign Up" ? "SUBMIT" : "LOGIN"}
        </button>

        {status === "Sign Up" ? (
          <p className="mt-2 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setStatus("Login")}
              className="text-blue-500 cursor-pointer hover:font-semibold hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-2 text-sm">
            Don&apos;t have an account.{" "}
            <span
              onClick={() => setStatus("Sign Up")}
              className="text-blue-500 cursor-pointer hover:font-semibold hover:underline"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
