import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

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
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={`fixed w-full bg-black text-white p-4 shadow-lg ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
          Placement Portal
        </div>
        <ul className={`flex-col md:flex-row md:flex md:items-center absolute md:static bg-black w-full md:w-auto left-0 top-14 md:top-auto p-4 md:p-0 ${show ? "block" : "hidden"}`}>
          <li className="md:ml-6">
            <Link to="/" className="block py-2 md:py-0 hover:text-gray-300" onClick={() => setShow(false)}>Home</Link>
          </li>
          <li className="md:ml-6">
            <Link to="/job/getall" className="block py-2 md:py-0 hover:text-gray-300" onClick={() => setShow(false)}>All Jobs</Link>
          </li>
          <li className="md:ml-6">
            <Link to="/applications/me" className="block py-2 md:py-0 hover:text-gray-300 " onClick={() => setShow(false)}>
              {user && user.role === "Employer" ? "Applicant's Application" : "My Application"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li className="md:ml-6">
                <Link to="/job/post" className="block py-2 md:py-0 hover:text-gray-300" onClick={() => setShow(false)}>Post Opportunity</Link>
              </li>
              <li className="md:ml-6">
                <Link to="/job/me" className="block py-2 md:py-0 hover:text-gray-300" onClick={() => setShow(false)}>View Your Jobs</Link>
              </li>
            </>
          )}
          <li className="md:ml-6">
            <button onClick={handleLogout} className="block py-4 md:py-1 bg-zinc-500 px-5 hover:text-gray-300 rounded-lg">Logout</button>
          </li>
        </ul>
        <div className="md:hidden">
          <GiHamburgerMenu onClick={() => setShow(!show)} className="text-2xl cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
