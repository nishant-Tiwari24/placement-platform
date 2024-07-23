import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="bg-white text-black py-20 font-poppins">
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        <div className="title mb-10 pt-32">
          <h1 className="text-7xl font-extrabold">Find a job that suits</h1>
          <h1 className="text-7xl font-extrabold">your interests and skills</h1>
          <p className="text-gray-600 mt-4">
            Explore thousands of job opportunities from top companies. Whether you're a seasoned professional or a fresh graduate, find the perfect role that matches your career aspirations.
          </p>
        </div>
      </div>
      <div className="details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-36">
        {details.map((element) => (
          <div
            key={element.id}
            className="card bg-zinc-200 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="icon text-4xl mb-4 text-zinc-600">{element.icon}</div>
            <div className="content text-center">
              <p className="text-2xl font-bold text-zinc-800">{element.title}</p>
              <p className="text-zinc-600">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
