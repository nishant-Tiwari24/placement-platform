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

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

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

  return (
    <div className="myJobs bg-gray-100 py-12 px-4 min-h-screen">
      <div className="container mx-auto max-w-full md:max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 mt-10 text-gray-800">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-800 text-white text-left">
                  <th className="p-2 md:p-3 border-b">Title</th>
                  <th className="p-2 md:p-3 border-b">Country</th>
                  <th className="p-2 md:p-3 border-b">City</th>
                  <th className="p-2 md:p-3 border-b">Category</th>
                  <th className="p-2 md:p-3 border-b">Salary</th>
                  <th className="p-2 md:p-3 border-b">Expired</th>
                  <th className="p-2 md:p-3 border-b">Description</th>
                  <th className="p-2 md:p-3 border-b">Location</th>
                  <th className="p-2 md:p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((element) => (
                  <tr key={element._id} className="hover:bg-gray-50">
                    <td className="p-2 md:p-3 border-b">
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 focus:outline-none"
                      />
                    </td>
                    <td className="p-2 md:p-3 border-b">
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(element._id, "country", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 focus:outline-none"
                      />
                    </td>
                    <td className="p-2 md:p-3 border-b">
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 focus:outline-none"
                      />
                    </td>
                    <td className="p-2 md:p-3 border-b">
                      <select
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(element._id, "category", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        className="w-full border rounded px-2 py-1 bg-white focus:outline-none"
                      >
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Frontend Web Development">Frontend Web Development</option>
                        <option value="MERN Stack Development">MERN Stack Development</option>
                        <option value="Account & Finance">Account & Finance</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="MEAN Stack Development">MEAN Stack Development</option>
                        <option value="MEVN Stack Development">MEVN Stack Development</option>
                        <option value="Data Entry Operator">Data Entry Operator</option>
                      </select>
                    </td>
                    <td className="p-2 md:p-3 border-b">
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          onChange={(e) =>
                            handleInputChange(element._id, "fixedSalary", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1 focus:outline-none"
                        />
                      ) : (
                        <div className="flex flex-col md:flex-row gap-2">
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) =>
                              handleInputChange(element._id, "salaryFrom", e.target.value)
                            }
                            className="w-full md:w-1/2 border rounded px-2 py-1 focus:outline-none"
                          />
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) =>
                              handleInputChange(element._id, "salaryTo", e.target.value)
                            }
                            className="w-full md:w-1/2 border rounded px-2 py-1 focus:outline-none"
                          />
                        </div>
                      )}
                    </td>
                    <td className="p-2 md:p-3 border-b">
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(element._id, "expired", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        className="w-full border rounded px-2 py-1 bg-white focus:outline-none"
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </td>
                    <td className="p-2 md:p-3 border-b">
                      <textarea
                        rows={2}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "description", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 focus:outline-none"
                      />
                    </td>
                    <td className="p-2 md:p-3 border-b">
                      <textarea
                        value={element.location}
                        rows={2}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "location", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 focus:outline-none"
                      />
                    </td>
                    <td className="p-2 md:p-3 border-b">
                      <div className="flex flex-col md:flex-row gap-2">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteJob(element._id)}
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-8">You've not posted any jobs or may have deleted all of your jobs!</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
