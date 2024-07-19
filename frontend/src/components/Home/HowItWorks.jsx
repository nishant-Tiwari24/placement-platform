import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks py-12 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-8 text-zinc-800">How Placement Portal Works</h3>
          <div className="banner flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="card bg-white rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-zinc-400 hover:border-zinc-600">
              <FaUserPlus className="text-5xl mb-4 text-zinc-800" />
              <p className="text-2xl font-bold text-zinc-800">Create Account</p>
              <p className="text-center text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className="card bg-white rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-zinc-400 hover:border-zinc-600">
              <MdFindInPage className="text-5xl mb-4 text-zinc-800" />
              <p className="text-2xl font-bold text-white">Find a Job/Post a Job</p>
              <p className="text-center text-zinc-300">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className="card bg-white rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-zinc-400 hover:border-zinc-600">
              <IoMdSend className="text-5xl mb-4 text-zinc-800" />
              <p className="text-2xl font-bold zinc-blue-800">Apply For Job/Recruit Suitable Candidates</p>
              <p className="text-center text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
