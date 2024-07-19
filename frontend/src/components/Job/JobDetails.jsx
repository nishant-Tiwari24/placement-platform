import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page bg-gray-100 py-12 min-h-screen">
      <div className="container max-w-4xl bg-white rounded-xl pt-36 shadow-lg p-8">
        <h3 className="text-4xl font-bold mb-8 text-black">Job Details of {job.title}</h3>
        <div className="banner space-y-4">
          <p className="text-xl text-black">
            <strong>Title:</strong> <span className="font-semibold">{job.title}</span>
          </p>
          <p className="text-xl text-black">
            <strong>Category:</strong> <span className="font-semibold">{job.category}</span>
          </p>
          <p className="text-xl text-black">
            <strong>Country:</strong> <span className="font-semibold">{job.country}</span>
          </p>
          <p className="text-xl text-black">
            <strong>City:</strong> <span className="font-semibold">{job.city}</span>
          </p>
          <p className="text-xl text-black">
            <strong>Location:</strong> <span className="font-semibold">{job.location}</span>
          </p>
          <p className="text-xl text-black">
            <strong>Description:</strong> <span className="font-semibold">{job.description}</span>
          </p>
          <p className="text-xl text-black">
            <strong>Job Posted On:</strong> <span className="font-semibold">{job.jobPostedOn}</span>
          </p>
          <p className="text-xl text-black">
            <strong>Salary:</strong> 
            {job.fixedSalary ? (
              <span className="font-semibold"> {job.fixedSalary}</span>
            ) : (
              <span className="font-semibold"> {job.salaryFrom} - {job.salaryTo}</span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link
              to={`/application/${job._id}`}
              className="inline-block mt-6 bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
