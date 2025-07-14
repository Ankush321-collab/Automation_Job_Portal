import { catchasyncerror } from "../Middlewares/catchasyncerror.js";
import ErrorHandler from "../Middlewares/error.js";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import { sendtoken } from "../utils/jtwtoken.js";
import { User } from "../Models/User.Schema.js";

export const signup = catchasyncerror(async (req, res, next) => {
  const {
    fullname,
    email,
    phone,
    address,
    password,
    confirmpassword,
    role,
    first_preference,
    second_preference,
    third_preference,
    coverletter,
  } = req.body;

  // ✅ Basic Required Fields Check
  const missingFields = [];

  if (!fullname) missingFields.push("fullname");
  if (!email) missingFields.push("email");
  if (!phone) missingFields.push("phone");
  if (!address) missingFields.push("address");
  if (!password) missingFields.push("password");
  if (!role) missingFields.push("role");
  if (!coverletter) missingFields.push("coverletter");
  if (!confirmpassword) missingFields.push("confirmpassword");


  // Conditional Preferences for Job Seeker
  if (role === "job seeker") {
    if (!first_preference) missingFields.push("first_preference");
    if (!second_preference) missingFields.push("second_preference");
    if (!third_preference) missingFields.push("third_preference");
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing fields: ${missingFields.join(", ")}`,
    });
  }

  if (password.length < 8 || password.length > 32) {
    return res.status(400).json({
      success: false,
      message: "Password must be between 8 and 32 characters."
    });
  }
  if(password!==confirmpassword){
    return next(new ErrorHandler("password did not match"))
  }


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    fullname,
    email,
    phone,
    address,
    password: hashedPassword,
    role,
    coverletter,
    prefernce: {
      first_preference,
      second_preference,
      third_preference,
    },
  };

  try {
    // ✅ Resume Upload to Cloudinary
    if (req.files && req.files.resume) {
      const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedMimeTypes.includes(req.files.resume.mimetype)) {
        return next(new ErrorHandler("Unsupported file type for resume upload. Please upload PDF, DOC, or DOCX files.", 400));
      }
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      console.log("Cloudinary config at upload:", cloudinary.config());
      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.files.resume.tempFilePath,
        {
          folder: "JOB_SEEKER_Resume",
          resource_type: "raw"
        }
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed to upload resume to Cloudinary", 500)
        );
      }
      newUser.resume = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    const user = await User.create(newUser);
    sendtoken(user, 200, res, "User registered successfully");

  } catch (error) {
    console.error("Signup error:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

export const login=catchasyncerror(async(req,res,next)=>{
    const{email,password,role}=req.body;
    if(!role ||!email ||!password){
        return next(new ErrorHandler("Email,password and role is required"))

    }

    const user=await User.findOne({email}).select("password role");
    if(!user){
        return next(new ErrorHandler("User could not find!!Check Email"))
    }
    const ispassword=await bcrypt.compare(password, user.password);

    if(!ispassword){
        return next(new ErrorHandler("password could not match",404))
    }
    if(user.role!==role){
        return next(new ErrorHandler("Invalid user role.", 400)); 
    }
    sendtoken(user, 200, res, "User logged in successfully.");


})
