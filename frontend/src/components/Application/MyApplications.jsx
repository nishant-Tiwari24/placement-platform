import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const url = user && user.role === "Employer"
          ? "http://localhost:4000/api/v1/application/employer/getall"
          : "http://localhost:4000/api/v1/application/jobseeker/getall";
        const { data } = await axios.get(url, { withCredentials: true });
        setApplications(data.applications);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchApplications();
  }, [user, isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setApplications((prev) => prev.filter((application) => application._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications bg-gray-100 py-12 px-4 min-h-screen">
      <div className="container mx-auto max-w-full md:max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 mt-24 text-gray-800">
          {user && user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
        </h1>
        {applications.length === 0 ? (
          <h4 className="text-gray-600 text-center mt-8">No Applications Found</h4>
        ) : (
          applications.map((element) =>
            user && user.role === "Job Seeker" ? (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ) : (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
              />
            )
          )
        )}
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card bg-white border border-gray-200 rounded-lg shadow-md mb-4 p-4">
      <div className="detail mb-4">
        <p className="text-gray-800">
          <span className="font-semibold">Name:</span> {element.name}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Email:</span> {element.email}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Phone:</span> {element.phone}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Address:</span> {element.address}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume mb-4">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-full h-auto cursor-pointer rounded"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area flex justify-end">
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card bg-white border border-gray-200 rounded-lg shadow-md mb-4 p-4">
      <div className="detail mb-4">
        <p className="text-gray-800">
          <span className="font-semibold">Name:</span> {element.name}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Email:</span> {element.email}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Phone:</span> {element.phone}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Address:</span> {element.address}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume mb-4">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-full h-auto cursor-pointer rounded"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};
