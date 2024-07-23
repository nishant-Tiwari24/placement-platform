import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <>
{/* <<<<<<< HEAD */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            
            <h3 className="text-2xl font-semibold mt-4">Login to your account</h3>
          </div>
          <form>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Login As</label>
              <div className="flex items-center bg-zinc-100 border-black border-[1px] rounded-lg">
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Teacher</option>
                  <option value="Student">Student</option>
                </select>
                <FaRegUser size={24} className="text-xl mx-2 text-black" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="flex items-center bg-zinc-100 border-black border-[1px] rounded-lg">
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-zinc-100 border-none focus:outline-none text-black"
                />
                <MdOutlineMailOutline size={24} className="text-xl mx-2 text-black" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="flex items-center bg-zinc-100 border-black border-[1px] rounded-lg">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                />
                <RiLock2Fill size={24} className="text-xl mx-2 text-black" />
              </div>
            </div>
            <button 
              type="submit" 
              onClick={handleLogin}
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition duration-300"
            >
              Login
            </button>

            <div className="text-center mt-4">
              {/* <Link to="/register" className="text-sm text-zinc-600 hover:text-black">
                Register Now ?
              </Link> */}
            </div>
            {/* <Link to={"/register"}>Register Now</Link> */}

          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
