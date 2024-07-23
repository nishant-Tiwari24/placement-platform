import React, { useContext, useState } from "react";
// import { FaRegUser, FaPencilAlt, FaPhoneFlip } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [formData, setFormData] = useState({
        fathersName: "",
        mothersName: "",
        middleName: "",
        lastName: "",
        candidateFullName: "",
        branch: "",
        classRollNumber: "",
        prnNumber: "",
        studentMobileNumber: "",
        parentMobileNumber: "",
        panCardNumber: "",
        aadharCardNumber: "",
        residentialAddress: "",
        currentLocation: "",
        currentAddress: "",
        permanentResidenceCity: "",
        permanentResidenceState: "",
        dateOfBirth: "",
        gender: "",
        lgbtq: "",
        physicallyDisabled: "",
        physicalDisabilityDetails: "",
        nationality: "",
        foreignLanguage: "",
        foreignLanguageProficiency: "",
        schoolName: "",
        boardName: "",
        yearOfPassing10th: "",
        percentage10th: "",
        yearGapAfter10th: "",
        schoolCollegeName12th: "",
        boardName12th: "",
        yearOfPassing12th: "",
        percentage12th: "",
        yearGapAfter12th: "",
        schoolCollegeNameDiploma: "",
        boardNameDiploma: "",
        yearOfPassingDiploma: "",
        diplomaGraduatedState: "",
        sem1DiplomaPercentage: "",
        sem2DiplomaPercentage: "",
        sem3DiplomaPercentage: "",
        sem4DiplomaPercentage: "",
        sem5DiplomaPercentage: "",
        sem6DiplomaPercentage: "",
        aggregatePercentageDiploma: "",
        yearGapAfterDiploma: "",
        currentPursuingDegree: "",
        yearOfAdmission: "",
        sem1CGPA: "",
        sem1PassingDate: "",
        sem2CGPA: "",
        sem2PassingDate: "",
        sem3CGPA: "",
        sem3PassingDate: "",
        sem4CGPA: "",
        sem4PassingDate: "",
        sem5CGPA: "",
        sem5PassingDate: "",
        aggregateCGPITillSem5: "",
        aggregatePercentageTillSem5: "",
        yearDropInUG: "",
        deadKT: "",
        totalDeadKT: "",
        liveKT: "",
        totalLiveKT: "",
        totalInternalKT: "",
        totalExternalKT: "",
        yearOfEducationGap: "",
        additionalQualification: "",
        technologiesKnown: "",
        workExperienceMonths: "",
        internshipCompany: "",
        internshipRole: "",
        postGraduationCGPA: "",
        workExperienceYears: "",
        special: ""
    });

    const { isAuthorized, setIsAuthorized } = useContext(Context);

// User validation failed: name: Name must contain at least 3 Characters!,
//  role: `student` is not a valid enum value for path `role`.

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(
                "http://localhost:4000/api/v1/user/register",
                {name, email, phone, password, role, ...formData},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setFormData({});
            setIsAuthorized(true);
        } catch (error) {
          const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
          toast.error(errorMessage);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (isAuthorized) {
        return <Navigate to={"/"} />;
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold mt-4">
                        Create a new account
                    </h3>
                </div>
                <form>
                    {step === 1 && (
                        <>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    // value={formData.email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    // value={formData.name}
                                    // onChange={handleChange}
                                    onChange={(e)=> setName(e.target.value)}

                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    // value={formData.phone}
                                    // onChange={handleChange}
                                    onChange={(e)=> setPhone(e.target.value)}

                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    // value={formData.password}
                                    // onChange={handleChange}
                                    onChange={(e)=> setPassword(e.target.value)}

                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    // value={formData.role}
                                    // onChange={handleChange}
                                    onChange={(e)=> setRole(e.target.value)}

                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                >
                                    <option value="">Select Role</option>
                                    <option value="Student">Student</option>
                                    {/* Add more role options as needed */}
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                // onClick={handleRegister}
                                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition duration-300"
                            >
                                Next
                            </button>
                            <div className="text-center mt-4">
                            <Link to="/login" className="text-lg text-green-700 hover:text-black">
                                Login ?
                            </Link>
                            </div>
                        </>
                    )} 
                    {step === 2 && (
                        <>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Father's Name
                                </label>
                                <input
                                    type="text"
                                    name="fathersName"
                                    value={formData.fathersName}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Mother's Name
                                </label>
                                <input
                                    type="text"
                                    name="mothersName"
                                    value={formData.mothersName}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Candidate Full Name
                                </label>
                                <input
                                    type="text"
                                    name="candidateFullName"
                                    value={formData.candidateFullName}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    LGBTQ
                                </label>
                                <select
                                    name="lgbtq"
                                    value={formData.lgbtq}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                >
                                    <option value="">Select Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="prefer_not_to_say">
                                        Prefer not to say
                                    </option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Physically Disabled
                                </label>
                                <select
                                    name="physicallyDisabled"
                                    value={formData.physicallyDisabled}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                >
                                    <option value="">Select Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Physical Disability Details
                                </label>
                                <textarea
                                    name="physicalDisabilityDetails"
                                    value={formData.physicalDisabilityDetails}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Nationality
                                </label>
                                <input
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Foreign Language
                                </label>
                                <input
                                    type="text"
                                    name="foreignLanguage"
                                    value={formData.foreignLanguage}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Foreign Language Proficiency
                                </label>
                                <select
                                    name="foreignLanguageProficiency"
                                    value={formData.foreignLanguageProficiency}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                >
                                    <option value="">Select Proficiency</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">
                                        Intermediate
                                    </option>
                                    <option value="advanced">Advanced</option>
                                    <option value="fluent">Fluent</option>
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() => setStep(3)}
                                // onClick={handleRegister}
                                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition duration-300"
                            >
                                Next
                            </button>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Branch
                                </label>
                                <input
                                    type="text"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Class Roll Number
                                </label>
                                <input
                                    type="text"
                                    name="classRollNumber"
                                    value={formData.classRollNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    PRN Number
                                </label>
                                <input
                                    type="text"
                                    name="prnNumber"
                                    value={formData.prnNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Student Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    name="studentMobileNumber"
                                    value={formData.studentMobileNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Parent Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    name="parentMobileNumber"
                                    value={formData.parentMobileNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    PAN Card Number
                                </label>
                                <input
                                    type="text"
                                    name="panCardNumber"
                                    value={formData.panCardNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Aadhar Card Number
                                </label>
                                <input
                                    type="text"
                                    name="aadharCardNumber"
                                    value={formData.aadharCardNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Residential Address
                                </label>
                                <textarea
                                    name="residentialAddress"
                                    value={formData.residentialAddress}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Current Location
                                </label>
                                <input
                                    type="text"
                                    name="currentLocation"
                                    value={formData.currentLocation}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Current Address
                                </label>
                                <textarea
                                    name="currentAddress"
                                    value={formData.currentAddress}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Permanent Residence City
                                </label>
                                <input
                                    type="text"
                                    name="permanentResidenceCity"
                                    value={formData.permanentResidenceCity}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Permanent Residence State
                                </label>
                                <input
                                    type="text"
                                    name="permanentResidenceState"
                                    value={formData.permanentResidenceState}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep(4)}
                                // onClick={handleRegister}
                                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition duration-300"
                            >
                                Next
                            </button>
                        </>
                    )}
                    

{step === 4 && (
  <>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              School Name (10th)
          </label>
          <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Board Name (10th)
          </label>
          <input
              type="text"
              name="boardName"
              value={formData.boardName}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Year of Passing 10th
          </label>
          <input
              type="number"
              name="yearOfPassing10th"
              value={formData.yearOfPassing10th}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Percentage in 10th
          </label>
          <input
              type="number"
              step="0.01"
              name="percentage10th"
              value={formData.percentage10th}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Year Gap After 10th
          </label>
          <input
              type="number"
              name="yearGapAfter10th"
              value={formData.yearGapAfter10th}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              School/College Name (12th)
          </label>
          <input
              type="text"
              name="schoolCollegeName12th"
              value={formData.schoolCollegeName12th}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Board Name (12th)
          </label>
          <input
              type="text"
              name="boardName12th"
              value={formData.boardName12th}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Year of Passing 12th
          </label>
          <input
              type="number"
              name="yearOfPassing12th"
              value={formData.yearOfPassing12th}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Percentage in 12th
          </label>
          <input
              type="number"
              step="0.01"
              name="percentage12th"
              value={formData.percentage12th}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Year Gap After 12th
          </label>
          <input
              type="number"
              name="yearGapAfter12th"
              value={formData.yearGapAfter12th}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              School/College Name (Diploma)
          </label>
          <input
              type="text"
              name="schoolCollegeNameDiploma"
              value={formData.schoolCollegeNameDiploma}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Board Name (Diploma)
          </label>
          <input
              type="text"
              name="boardNameDiploma"
              value={formData.boardNameDiploma}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Year of Passing Diploma
          </label>
          <input
              type="number"
              name="yearOfPassingDiploma"
              value={formData.yearOfPassingDiploma}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Diploma Graduated State
          </label>
          <input
              type="text"
              name="diplomaGraduatedState"
              value={formData.diplomaGraduatedState}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      {/* Diploma Semester Percentages */}
      {[1, 2, 3, 4, 5, 6].map((sem) => (
          <div key={sem} className="mb-6">
              <label className="block text-sm font-medium mb-2">{`Sem ${sem} Diploma Percentage`}</label>
              <input
                  type="number"
                  step="0.01"
                  name={`sem${sem}DiplomaPercentage`}
                  value={
                      formData[
                          `sem${sem}DiplomaPercentage`
                      ]
                  }
                  onChange={handleChange}
                  className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
              />
          </div>
      ))}
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Aggregate Percentage Diploma
          </label>
          <input
              type="number"
              step="0.01"
              name="aggregatePercentageDiploma"
              value={formData.aggregatePercentageDiploma}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Year Gap After Diploma
          </label>
          <input
              type="number"
              name="yearGapAfterDiploma"
              value={formData.yearGapAfterDiploma}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Current Pursuing Degree
          </label>
          <input
              type="text"
              name="currentPursuingDegree"
              value={formData.currentPursuingDegree}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Year of Admission
          </label>
          <input
              type="number"
              name="yearOfAdmission"
              value={formData.yearOfAdmission}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      {/* Current Degree Semester CGPA and Passing Dates */}
      {[1, 2, 3, 4, 5].map((sem) => (
          <React.Fragment key={sem}>
              <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">{`Sem ${sem} CGPA`}</label>
                  <input
                      type="number"
                      step="0.01"
                      name={`sem${sem}CGPA`}
                      value={formData[`sem${sem}CGPA`]}
                      onChange={handleChange}
                      className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                  />
              </div>
              <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">{`Sem ${sem} Passing Date`}</label>
                  <input
                      type="date"
                      name={`sem${sem}PassingDate`}
                      value={
                          formData[`sem${sem}PassingDate`]
                      }
                      onChange={handleChange}
                      className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                  />
              </div>
          </React.Fragment>
      ))}
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Aggregate CGPI Till Sem 5
          </label>
          <input
              type="number"
              step="0.01"
              name="aggregateCGPITillSem5"
              value={formData.aggregateCGPITillSem5}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Aggregate Percentage Till Sem 5
          </label>
          <input
              type="number"
              step="0.01"
              name="aggregatePercentageTillSem5"
              value={formData.aggregatePercentageTillSem5}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Year Drop in UG
          </label>
          <input
              type="number"
              name="yearDropInUG"
              value={formData.yearDropInUG}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Dead KT
          </label>
          <input
              type="number"
              name="deadKT"
              value={formData.deadKT}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Total Dead KT
          </label>
          <input
              type="number"
              name="totalDeadKT"
              value={formData.totalDeadKT}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Live KT
          </label>
          <input
              type="number"
              name="liveKT"
              value={formData.liveKT}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Total Live KT
          </label>
          <input
              type="number"
              name="totalLiveKT"
              value={formData.totalLiveKT}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Total Internal KT
          </label>
          <input
              type="number"
              name="totalInternalKT"
              value={formData.totalInternalKT}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
              Total External KT
          </label>
          <input
              type="number"
              name="totalExternalKT"
              value={formData.totalExternalKT}
              onChange={handleChange}
              className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
          />
      </div>
      <button
          type="button"
          onClick={() => setStep(5)}
          className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition duration-300"
      >
          Next
      </button>
  </>
)}

                    
                    {step === 5 && (
                        <>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Year of Education Gap
                                </label>
                                <input
                                    type="number"
                                    name="yearOfEducationGap"
                                    value={formData.yearOfEducationGap}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Additional Qualification
                                </label>
                                <textarea
                                    name="additionalQualification"
                                    value={formData.additionalQualification}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Technologies Known
                                </label>
                                <textarea
                                    name="technologiesKnown"
                                    value={formData.technologiesKnown}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                    rows="3"
                                    placeholder="Separate technologies with commas"
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Work Experience (Months)
                                </label>
                                <input
                                    type="number"
                                    name="workExperienceMonths"
                                    value={formData.workExperienceMonths}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Internship Company
                                </label>
                                <input
                                    type="text"
                                    name="internshipCompany"
                                    value={formData.internshipCompany}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Internship Role
                                </label>
                                <input
                                    type="text"
                                    name="internshipRole"
                                    value={formData.internshipRole}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Post Graduation CGPA
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="postGraduationCGPA"
                                    value={formData.postGraduationCGPA}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Work Experience (Years)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="workExperienceYears"
                                    value={formData.workExperienceYears}
                                    onChange={handleChange}
                                    className="w-full p-3 border-black border-[1px] bg-zinc-100 rounded-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={handleRegister}
                                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition duration-300"
                            >
                                Complete Registration
                            </button>
                        </>
                    )}
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="w-full py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300 mt-4"
                        >
                            Previous
                        </button>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Register;
