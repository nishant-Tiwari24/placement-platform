import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { InviteContorller } from "./InviteContorller.js";
import { sendInvitationEmail } from "../utils/sendEmail.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role, ...FormData } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill the full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  let userData = { name, email, phone, password, role, special:"" };

  if (role === "Student") {
    userData = { ...userData, ...FormData };
  }
  else{
    userData = userData;
  }

  

  const user = await User.create(userData);
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});



export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const { passCode } = req.body;

  console.log(user, passCode, "sfdads");
  user.passCode = passCode;
  await user.save()

  res.status(200).json({
    success: true,
    user,
  });
});

export const getStudent = catchAsyncErrors(async (req, res, next)=>{
  let user;
  user = await User.find({
    role:"Student"
  });
  res.status(200).json({
    success: true,
    user,
  });
})

export const getStudentById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ErrorHandler("Invalid ID format.", 400));
  }

  const user = await User.findOne({ _id: id, role: "Student" });

  if (!user) {
    return next(new ErrorHandler("Student not found.", 404));
  }
  
  res.status(200).json({
    success: true,
    user,
  });
});


export const updateSpecial = catchAsyncErrors(async(req, res, next)=>{
  const { email } = req.body;
  const currUser = req.user;
  console.log(email, "dfadsf");
  const user = await User.findOne({email});

  if(!user) {
    return next(new ErrorHandler("Invalid Email.", 400));
  }
  const a = "special";
  user.special = a;


  await user.save();
  const b = await sendInvitationEmail(email, currUser, "uhave been invited as special");
  if(b){
    console.log(b.messageId, "sdfasdf af asfa sf ")
    return res.status(201).json({
              message: b
          })
  }

  res.status(200).json({
    success: true,
    user,
    message: "updated user."
  });
})

