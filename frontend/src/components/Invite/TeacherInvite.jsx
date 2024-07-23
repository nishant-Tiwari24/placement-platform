import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck, FaSearch, FaLock, FaEnvelope, FaPaste } from "react-icons/fa";
import { Link } from "react-router-dom";

const TeacherInvite = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [input, setInput] = useState("");
    const [passCode, setPassCode] = useState("");
    const [code, setCode] = useState(false);
    const [appCode, setAppCode] = useState("");
    const [special, setSpecial] = useState(false);
    const [students, setStudents] = useState([
        { id: "sdfa", name: "John Doe", email: "john@example.com", status: "Active" },
        { id: "sdfa", name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    ]);

    useEffect(() => {
        const fetchdetail = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/api/v1/user/getstudent`,
                    {
                        withCredentials: true,
                        
                    }
                );
                const res1 = await axios.get(
                    `http://localhost:4000/api/v1/user/getuser`,
                    {
                        withCredentials: true,
                       
                    }
                );
                const u = await res1.data.user;
                if (u.passCode === "") {
                    setCode(true);
                }
                setPassCode(u.passCode);
                const st = await res.data.user;
                console.log(st)
                setStudents([...st])
            } catch (error) {
                console.log(error);
                toast.error("error");
            }
        };
        fetchdetail();
    }, []);

    const handleInvite = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handlespecialInvite =()=>{
        setSpecial(true);
    }
    const handlespecialclose = ()=>{
        setSpecial(false);
    }

    const validateEmail = async (email) => {
        try {
            const response = await axios.get(`https://emailverification.whoisxmlapi.com/api/v3?apiKey=at_Of0VWsuA65qOxyXJU8fJpkHgWEn4m&emailAddress=${email}`);
            return response.data.smtpCheck === 'true';
        } catch (error) {
            console.error('Error validating email:', error);
            return false;
        }
    };

    const handleSubmitInvite = async (e) => {
        e.preventDefault();
        if (!await validateEmail(input)) {
            toast.error("Invalid email address.");
            setInput("")
            return;
        }
        try {
            const res = await axios.post(
                `http://localhost:4000/api/v1/invites/student`,
                { email: input },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
                
            );
            console.log(res);
            setInput("");
            toast.success("Invite sent successfull.");
        } catch (error) {
            toast.error("Invitation failed.");
            console.log(error);
        }
        setShowPopup(false);
    };

    // function removeSpaces(str) {
    //     return str.replace(/\s+/g, "");
    // }

    const handleCodeSubmit = async () => {
        try {
            setPassCode(appCode);
            // let appPassword = removeSpaces(appCode);
            console.log(passCode);
            const res = await axios.post(
                `http://localhost:4000/api/v1/user/update-detail`,
                { passCode: appCode },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(res);
            setAppCode("");
            setCode(false);
        } catch (error) {
            toast.error("caught error");
            console.log(error);
        }
    };

    const handleSpeicalSubmitInvite = async ()=>{
        try {
            const res = await axios.post(
                `http://localhost:4000/api/v1/user/updatespecial`,
                { email:input },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setInput("");
            console.log(res);
            toast.success("invite sent.")
            setSpecial(false);

        } catch (error) {
            console.log(error);
            toast.error("error");
        }
    }

    return (
        <div className="max-w-3xl mx-auto pt-24 min-h-screen p-4 sm:p-6 sm:pt-24 lg:p-8 lg:pt-20">
            {!code &&
            <div className="flex justify-between">
                <button
                    className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white py-2 px-4 rounded text-base mb-5 cursor-pointer"
                    onClick={handleInvite}
                >
                    Invite student
                </button>

                <button
                    className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white py-2 px-4 rounded text-base mb-5 cursor-pointer"
                    onClick={handleInvite}
                >
                    Bulk Invite
                </button>

                <button
                    className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white py-2 px-4 rounded text-base mb-5 cursor-pointer"
                    onClick={handlespecialInvite}
                >
                    Special Invite
                </button>

            </div>
            }
              

            {!code &&
              <div className="bg-gray-100 rounded p-4 sm:p-6">
                <h2 className="text-xl font-bold mb-4">All Students</h2>
                {students.map((student, index) => (
                    <Link to={`/student/${student._id}`} key={student._id}>
                    <div 
                        key={index}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 mb-2 rounded shadow"
                    >
                        <span className="w-full sm:w-1/3 mb-2 sm:mb-0">
                            {student.name}
                        </span>
                        <span className="w-full sm:w-1/3 mb-2 sm:mb-0">
                            {student.email}
                        </span>
                        <span className="w-full sm:w-1/3 text-left text-green-500 sm:text-right">
                            {student.status === "" || "Active "}
                        </span>
                    </div>
                    </Link>
                ))}
            </div>
}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-5 rounded w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">
                            Invite Student
                        </h3>
                        <form
                            onSubmit={handleSubmitInvite}
                            className="flex flex-col"
                        >
                            <div className="flex items-center bg-zinc-100 border-black border-[1px] rounded-lg mb-4">
                                <input
                                    className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                                    onChange={(e) => setInput(e.target.value)}
                                    type="email"
                                    placeholder="Enter student email"
                                    required
                                />
                            </div>
                            <button
                                className="bg-black hover:bg-zinc-700 text-white py-2 px-4 rounded cursor-pointer"
                                type="submit"
                            >
                                Send Invite
                            </button>
                        </form>
                        <button
                            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer"
                            onClick={handleClosePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {code && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-5 rounded w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Add code</h3>
                        <form
                            onSubmit={handleCodeSubmit}
                            className="flex flex-col"
                        >
                            <div className="flex items-center bg-zinc-100 border-black border-[1px] rounded-lg mb-4">
                                <input
                                    className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                                    onChange={(e) => setAppCode(e.target.value)}
                                    type="appcode"
                                    placeholder="Enter App Code"
                                    required
                                />
                            </div>
                            <button
                                className="bg-black hover:bg-zinc-700 text-white py-2 px-4 rounded cursor-pointer"
                                type="submit"
                            >
                                Submit Code
                            </button>
                        </form>
                        <div className="bg-gray-100 mt-4 p-6 rounded-lg shadow-lg text-gray-900 max-w-md mx-auto font-sans">
                            <ul className="list-none p-0">
                                <li className="mb-4 pl-8 relative flex items-start">
                                    <FaCheck className="text-black absolute left-0 top-1" />
                                    <span className="ml-8">
                                        Go to Google on your device and then to
                                        manage your Google account.
                                    </span>
                                </li>
                                <li className="mb-4 pl-8 relative flex items-start">
                                    <FaLock className="text-black absolute left-0 top-1" />
                                    <span className="ml-8">
                                        Make sure you enable two-step
                                        verification.
                                    </span>
                                </li>
                                <li className="mb-4 pl-8 relative flex items-start">
                                    <FaSearch className="text-black absolute left-0 top-1" />
                                    <span className="ml-8">
                                        Go to the search bar at the top and type
                                        "App password".
                                    </span>
                                </li>
                                <li className="mb-4 pl-8 relative flex items-start">
                                    <FaEnvelope className="text-black absolute left-0 top-1" />
                                    <span className="ml-8">
                                        In the app name field, write "email".
                                    </span>
                                </li>
                                <li className="pl-8 relative flex items-start">
                                    <FaPaste className="text-black absolute left-0 top-1" />
                                    <span className="ml-8">
                                        Click on the create button and
                                        copy-paste the generated string into the
                                        input box above.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

{special && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-5 rounded w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">
                            Invite Student
                        </h3>
                        <form
                            onSubmit={handleSpeicalSubmitInvite}
                            className="flex flex-col"
                        >
                            <div className="flex items-center bg-zinc-100 border-black border-[1px] rounded-lg mb-4">
                                <input
                                    className="w-full p-3 bg-transparent border-none focus:outline-none text-black"
                                    onChange={(e) => setInput(e.target.value)}
                                    type="email"
                                    placeholder="Enter student email (special invite)"
                                    required
                                />
                            </div>
                            <button
                                className="bg-black hover:bg-zinc-700 text-white py-2 px-4 rounded cursor-pointer"
                                type="submit"
                            >
                                Send Invite
                            </button>
                        </form>
                        <button
                            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer"
                            onClick={handlespecialclose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherInvite;
