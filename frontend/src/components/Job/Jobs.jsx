import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    country: "",
    city: "",
    salaryFrom: "",
    salaryTo: "",
    expired: "",
  });

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      })
      .then((res) => {
        setJobs(res.data.jobs);
        setFilteredJobs(res.data.jobs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let filtered = jobs;
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter((job) =>
          job[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase())
        );
      }
    });
    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="flex flex-col md:flex-row bg-gray-200 min-h-screen py-8 gap-8 px-4">
      <aside className="w-full md:w-1/4 bg-white p-8 border-r border-gray-300 rounded-lg shadow-md mb-4 md:mb-0">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>
        {Object.keys(filters).map((filter) => (
          <div key={filter} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {filter.charAt(0).toUpperCase() + filter.slice(1)}:
            </label>
            <input
              type="text"
              name={filter}
              value={filters[filter]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </aside>
      <div className="w-full md:w-3/4 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">All Available Jobs</h1>
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 border-b border-gray-300">Title</th>
              <th className="p-4 border-b border-gray-300">Category</th>
              <th className="p-4 border-b border-gray-300">Country</th>
              <th className="p-4 border-b border-gray-300">City</th>
              <th className="p-4 border-b border-gray-300">Salary</th>
              <th className="p-4 border-b border-gray-300">Expired</th>
              <th className="p-4 border-b border-gray-300">Location</th>
              <th className="p-4 border-b border-gray-300">Description</th>
              <th className="p-4 border-b border-gray-300">Role</th>
              <th className="p-4 border-b border-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((element) => (
              <tr key={element._id} className="hover:bg-gray-100">
                <td className="p-4 border-b border-gray-300">{element.title}</td>
                <td className="p-4 border-b border-gray-300">{element.category}</td>
                <td className="p-4 border-b border-gray-300">{element.country}</td>
                <td className="p-4 border-b border-gray-300">{element.city}</td>
                <td className="p-4 border-b border-gray-300">
                  {element.fixedSalary ? element.fixedSalary : `${element.salaryFrom} - ${element.salaryTo}`}
                </td>
                <td className="p-4 border-b border-gray-300">{element.expired ? "Yes" : "No"}</td>
                <td className="p-4 border-b border-gray-300">{element.location}</td>
                <td className="p-4 border-b border-gray-300">{element.description.length > 40 ? `${element.description.slice(0, 40)}...` : element.description}</td>
                <td className="p-4 border-b border-gray-300">{element.role}</td>
                <td className="p-4 border-b border-gray-300">
                  <Link
                    to={`/job/${element._id}`}
                    className="text-gray-600  hover:text-gray-800"
                  >
                    Job Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Jobs;
