import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <nav className={`fixed w-full bg-black text-white p-4 shadow-lg z-50 ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto">
        <div className="flex justify-between gap-20 items-center">
          <div className="text-xl font-semibold">
            Placement Portal
          </div>
          <div className="md:hidden">
            {show ? (
              <IoMdClose onClick={toggleMenu} className="text-2xl cursor-pointer" />
            ) : (
              <GiHamburgerMenu onClick={toggleMenu} className="text-2xl cursor-pointer" />
            )}
          </div>
        </div>
        <ul className={`flex-col md:flex-row md:flex md:items-center md:justify-end mt-4 md:mt-0 ${show ? "block" : "hidden md:flex"}`}>
          <li className="md:ml-6 my-2 md:my-0">
            <Link to="/" className="block py-2 md:py-0 hover:text-gray-300" onClick={toggleMenu}>Home</Link>
          </li>
          <li className="md:ml-6 my-2 md:my-0">
            <Link to="/job/getall" className="block py-2 md:py-0 hover:text-gray-300" onClick={toggleMenu}>All Jobs</Link>
          </li>
          <li className="md:ml-6 my-2 md:my-0">
            <Link to="/applications/me" className="block py-2 md:py-0 hover:text-gray-300" onClick={toggleMenu}>
              {user && (user.role === "Employer" ) ? "" : "My Application"}
            </Link>
          </li>
          {user && (user.role === "Employer" || user.special === "special") && (
            <>
              <li className="md:ml-6 my-2 md:my-0">
                <Link to="/job/post" className="block py-2 md:py-0 hover:text-gray-300" onClick={toggleMenu}>Post Jobs</Link>
              </li>
              <li className="md:ml-6 my-2 md:my-0">
                <Link to="/job/me" className="block py-2 md:py-0 hover:text-gray-300" onClick={toggleMenu}>Jobs Posted</Link>
              </li>
              <li className="md:ml-6 my-2 md:my-0">
                <Link to={"/invite/student"} className="block py-2 md:py-0 hover:text-gray-300" onClick={toggleMenu}>
                  Invite Students
                </Link>
              </li>
            </>
          )}
          {user && user.role === "Student" && (
            <>
            <li className="md:ml-6 my-2 md:my-0">
                <Link to="/profile/student" className="block py-2 md:py-0 hover:text-gray-300" onClick={toggleMenu}>profile</Link>
            </li>
            </>
          )

          }
          <li className="md:ml-6 my-2 md:my-0">
            <button onClick={handleLogout} className="block w-full md:w-auto py-2 md:py-1 bg-zinc-500 px-5 hover:text-gray-300 rounded-lg transition duration-300 ease-in-out hover:bg-zinc-600">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;