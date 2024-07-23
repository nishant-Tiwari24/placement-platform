
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Student", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passCode: {
    type: String,
    default:""
  },  
  special: {
    type: String, 
    enum: ["special", ""],
    default: ""
  },
  emailAlt: String,
  firstName: String,
  fathersName: String,
  mothersName: String,
  middleName: String,
  lastName: String,
  candidateFullName: String,
  branch: String,
  classRollNumber: String,
  prnNumber: String,
  studentMobileNumber: String,
  parentMobileNumber: String,
  panCardNumber: String,
  aadharCardNumber: String,
  residentialAddress: String,
  currentLocation: String,
  currentAddress: String,
  permanentResidenceCity: String,
  permanentResidenceState: String,
  dateOfBirth: Date,
  gender: String,
  lgbtq: String,
  physicallyDisabled: String,
  physicalDisabilityDetails: String,
  nationality: String,
  foreignLanguage: String,
  foreignLanguageProficiency: String,
  schoolName: String,
  boardName: String,
  yearOfPassing10th: String,
  percentage10th: String,
  yearGapAfter10th: String,
  schoolCollegeName12th: String,
  boardName12th: String,
  yearOfPassing12th: String,
  percentage12th: String,
  yearGapAfter12th: String,
  schoolCollegeNameDiploma: String,
  boardNameDiploma: String,
  yearOfPassingDiploma: String,
  diplomaGraduatedState: String,
  sem1DiplomaPercentage: String,
  sem2DiplomaPercentage: String,
  sem3DiplomaPercentage: String,
  sem4DiplomaPercentage: String,
  sem5DiplomaPercentage: String,
  sem6DiplomaPercentage: String,
  aggregatePercentageDiploma: String,
  yearGapAfterDiploma: String,
  currentPursuingDegree: String,
  yearOfAdmission: String,
  sem1CGPA: String,
  sem1PassingDate: String,
  sem2CGPA: String,
  sem2PassingDate: String,
  sem3CGPA: String,
  sem3PassingDate: String,
  sem4CGPA: String,
  sem4PassingDate: String,
  sem5CGPA: String,
  sem5PassingDate: String,
  aggregateCGPITillSem5: String,
  aggregatePercentageTillSem5: String,
  yearDropInUG: String,
  deadKT: String,
  totalDeadKT: String,
  liveKT: String,
  totalLiveKT: String,
  totalInternalKT: String,
  totalExternalKT: String,
  yearOfEducationGap: String,
  additionalQualification: String,
  technologiesKnown: String,
  workExperienceMonths: String,
  internshipCompany: String,
  internshipRole: String,
  postGraduationCGPA: String,
  workExperienceYears: String,
});

// Encrypting the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparing user password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, '123', {
    expiresIn: '1d',
  });
};

export const User = mongoose.model("User", userSchema);



