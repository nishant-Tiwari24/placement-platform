import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && (user.role === "Student" && user.special === "" ))) {
      navigateTo("/");
    }
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  const handleApplications = async(jobId) =>{
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/application/${jobId}`, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigateTo(`/applications/jobs/${jobId}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="myJobs bg-gray-100 py-6 sm:py-12 px-2 sm:px-4 min-h-screen">
  <div className="container mx-auto max-w-full lg:max-w-6xl">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 mt-6 sm:mt-10 text-gray-800">Your Posted Jobs</h1>
    {myJobs.length > 0 ? (
      <div className="space-y-6">
        {myJobs.map((element) => (
          <div key={element._id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  disabled={editingMode !== element._id}
                  value={element.title}
                  onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  disabled={editingMode !== element._id}
                  value={element.country}
                  onChange={(e) => handleInputChange(element._id, "country", e.target.value)}
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  disabled={editingMode !== element._id}
                  value={element.city}
                  onChange={(e) => handleInputChange(element._id, "city", e.target.value)}
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={element.category}
                  onChange={(e) => handleInputChange(element._id, "category", e.target.value)}
                  disabled={editingMode !== element._id}
                  className="w-full border rounded px-2 py-1 bg-white focus:outline-none"
                >
                  {/* ... (options remain the same) ... */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                {element.fixedSalary ? (
                  <input
                    type="number"
                    disabled={editingMode !== element._id}
                    value={element.fixedSalary}
                    onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)}
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                  />
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      disabled={editingMode !== element._id}
                      value={element.salaryFrom}
                      onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)}
                      className="w-1/2 border rounded px-2 py-1 focus:outline-none"
                      placeholder="From"
                    />
                    <input
                      type="number"
                      disabled={editingMode !== element._id}
                      value={element.salaryTo}
                      onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)}
                      className="w-1/2 border rounded px-2 py-1 focus:outline-none"
                      placeholder="To"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expired</label>
                <select
                  value={element.expired}
                  onChange={(e) => handleInputChange(element._id, "expired", e.target.value)}
                  disabled={editingMode !== element._id}
                  className="w-full border rounded px-2 py-1 bg-white focus:outline-none"
                >
                  <option value={true}>TRUE</option>
                  <option value={false}>FALSE</option>
                </select>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={element.description}
                  disabled={editingMode !== element._id}
                  onChange={(e) => handleInputChange(element._id, "description", e.target.value)}
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <textarea
                  value={element.location}
                  rows={2}
                  disabled={editingMode !== element._id}
                  onChange={(e) => handleInputChange(element._id, "location", e.target.value)}
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              {editingMode === element._id ? (
                <>
                  <button
                    onClick={() => handleUpdateJob(element._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                  >
                    <FaCheck className="inline mr-1" /> Save
                  </button>
                  <button
                    onClick={() => handleDisableEdit()}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    <RxCross2 className="inline mr-1" /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEnableEdit(element._id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteJob(element._id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleApplications(element._id)}
                className="bg-purple-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                
                Applications
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600 text-center mt-8">You've not posted any jobs or may have deleted all of your jobs!</p>
    )}
  </div>
</div>
  );
};

export default MyJobs;