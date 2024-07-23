import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

// Initial state
const initialState = {};

// Reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return { ...state, ...action.payload };
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        default:
            return state;
    }
};

const StudentProfile = () => {
    const  student  = useParams();
    const [userData, dispatch] = useReducer(userReducer, initialState);
    const studentId = student.id;
    useEffect(() => {
        const fetchDetail = async (studentId) => {
            try {
                const res1 = await axios.get(
                    `http://localhost:4000/api/v1/user/getstudent/${studentId}`,
                    { withCredentials: true }
                );
                const user = await res1.data.user;
                console.log("Fetched user data:", user);
                dispatch({ type: 'SET_USER_DATA', payload: user });
            } catch (error) {
                console.log(error);
            }
        };
        if (studentId) {
            fetchDetail(studentId);
        }
    }, [studentId]);

    const updateField = (field, value) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });
    };

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-gray-300 pb-2">Profile Page</h1>

                <div className="space-y-8">

                    {/* Personal Information */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div><strong>Father's Name:</strong> {userData.fathersName}</div>
                            <div><strong>Mother's Name:</strong> {userData.mothersName}</div>
                            <div><strong>Middle Name:</strong> {userData.middleName}</div>
                            <div><strong>Last Name:</strong> {userData.lastName}</div>
                            <div><strong>Full Name:</strong> {userData.candidateFullName}</div>
                            <div><strong>Date of Birth:</strong> {userData.dateOfBirth}</div>
                            <div><strong>Gender:</strong> {userData.gender}</div>
                            <div><strong>LGBTQ:</strong> {userData.lgbtq}</div>
                            <div><strong>Physically Disabled:</strong> {userData.physicallyDisabled}</div>
                            <div><strong>Disability Details:</strong> {userData.physicalDisabilityDetails}</div>
                            <div><strong>Nationality:</strong> {userData.nationality}</div>
                            <div><strong>Foreign Language:</strong> {userData.foreignLanguage}</div>
                            <div><strong>Foreign Language Proficiency:</strong> {userData.foreignLanguageProficiency}</div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div><strong>Student Mobile Number:</strong> {userData.studentMobileNumber}</div>
                            <div><strong>Parent Mobile Number:</strong> {userData.parentMobileNumber}</div>
                            <div><strong>Email:</strong> {userData.email}</div>
                            <div><strong>Residential Address:</strong> {userData.residentialAddress}</div>
                            <div><strong>Current Address:</strong> {userData.currentAddress}</div>
                            <div><strong>Current Location:</strong> {userData.currentLocation}</div>
                            <div><strong>Permanent Residence City:</strong> {userData.permanentResidenceCity}</div>
                            <div><strong>Permanent Residence State:</strong> {userData.permanentResidenceState}</div>
                        </div>
                    </div>

                    {/* Identification Details */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Identification Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div><strong>PAN Card Number:</strong> {userData.panCardNumber}</div>
                            <div><strong>Aadhar Card Number:</strong> {userData.aadharCardNumber}</div>
                        </div>
                    </div>

                    {/* Educational Background */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Educational Background</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {/* 10th Grade */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">10th Grade</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    <div><strong>School Name:</strong> {userData.schoolName}</div>
                                    <div><strong>Board Name:</strong> {userData.boardName}</div>
                                    <div><strong>Year of Passing:</strong> {userData.yearOfPassing10th}</div>
                                    <div><strong>Percentage:</strong> {userData.percentage10th}</div>
                                    <div><strong>Year Gap After 10th:</strong> {userData.yearGapAfter10th}</div>
                                </div>
                            </div>

                            {/* 12th Grade */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">12th Grade</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    <div><strong>School/College Name:</strong> {userData.schoolCollegeName12th}</div>
                                    <div><strong>Board Name:</strong> {userData.boardName12th}</div>
                                    <div><strong>Year of Passing:</strong> {userData.yearOfPassing12th}</div>
                                    <div><strong>Percentage:</strong> {userData.percentage12th}</div>
                                    <div><strong>Year Gap After 12th:</strong> {userData.yearGapAfter12th}</div>
                                </div>
                            </div>

                            {/* Diploma */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">Diploma</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    <div><strong>School/College Name:</strong> {userData.schoolCollegeNameDiploma}</div>
                                    <div><strong>Board Name:</strong> {userData.boardNameDiploma}</div>
                                    <div><strong>Year of Passing:</strong> {userData.yearOfPassingDiploma}</div>
                                    <div><strong>Graduated State:</strong> {userData.diplomaGraduatedState}</div>
                                    <div><strong>Aggregate Percentage:</strong> {userData.aggregatePercentageDiploma}</div>
                                    {[1, 2, 3, 4, 5, 6].map(sem => (
                                        <div key={sem}><strong>Sem {sem} Percentage:</strong> {userData[`sem${sem}DiplomaPercentage`]}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Pursuing Degree */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Pursuing Degree</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div><strong>Degree:</strong> {userData.currentPursuingDegree}</div>
                            <div><strong>Year of Admission:</strong> {userData.yearOfAdmission}</div>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                <div key={sem}><strong>Sem {sem} Percentage:</strong> {userData[`sem${sem}DegreePercentage`]}</div>
                            ))}
                            <div><strong>Year Gap After Admission:</strong> {userData.yearGapAfterAdmission}</div>
                            <div><strong>Dropout:</strong> {userData.dropout}</div>
                            <div><strong>Course Backlog:</strong> {userData.courseBacklog}</div>
                            <div><strong>Current CGPA:</strong> {userData.currentCGPA}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
