import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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
    if (!isAuthorized) {
      navigateTo("/");
    }
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

  

  const applyFilters = () => {
    // ... your filter application logic
    setShowFilters(false);
  };
  return (
    <section className="bg-gray-200 min-h-screen py-8 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Available Jobs</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 lg:hidden"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`w-full lg:w-1/4 bg-white p-6 border-r border-gray-300 rounded-lg shadow-md mb-8 lg:mb-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
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
            <button
              onClick={applyFilters}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
            >
              Apply Filters
            </button>
          </aside>

          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {filteredJobs.map((element) => (
                <div key={element._id} className="border-b m-4 border-gray-300  p-6 hover:bg-gray-50">
                  <h2 className="text-xl font-semibold mb-2">{element.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="font-medium">Category:</span> {element.category}
                    </div>
                    <div>
                      <span className="font-medium">Country:</span> {element.country}
                    </div>
                    <div>
                      <span className="font-medium">City:</span> {element.city}
                    </div>
                    <div>
                      <span className="font-medium">Salary:</span> {element.fixedSalary ? element.fixedSalary : `${element.salaryFrom} - ${element.salaryTo}`}
                    </div>
                    <div>
                      <span className="font-medium">Expired:</span> {element.expired ? "Yes" : "No"}
                    </div>
                    <div>
                      <span className="font-medium">Role:</span> {element.role}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="font-medium">Location:</span> {element.location}
                  </div>
                  <div className="mb-4">
                    <span className="font-medium">Description:</span> {element.description}
                  </div>
                  <Link
                    to={`/job/${element._id}`}
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    View Job Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
