import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mt-4">Create a new account</h3>
          </div>
          <form>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Register As</label>
              <div className="flex items-center border-black border-[1px] bg-zinc-100 rounded-lg">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="text-xl mx-2 text-black" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Name</label>
              <div className="flex items-center border-black border-[1px] bg-zinc-100 rounded-lg">
                <input
                  type="text"
                  placeholder="Zeeshan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                />
                <FaPencilAlt className="text-xl mx-2 text-black" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="flex items-center border-black border-[1px] bg-zinc-100 rounded-lg">
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                />
                <MdOutlineMailOutline className="text-xl mx-2 text-black" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="flex items-center border-black border-[1px] bg-zinc-100 rounded-lg">
                <input
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                />
                <FaPhoneFlip className="text-xl mx-2 text-black" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="flex items-center border-black border-[1px] bg-zinc-100 rounded-lg">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                />
                <RiLock2Fill className="text-xl mx-2 text-black" />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleRegister}
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition duration-300"
            >
              Register
            </button>
            <div className="text-center mt-4">
              <Link to="/login" className="text-sm text-zinc-600 hover:text-black">
                Login Now !
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
