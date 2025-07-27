import { catchasyncerror } from "../Middlewares/catchasyncerror.js";
import ErrorHandler from "../Middlewares/error.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
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

  const missingFields = [];
  if (!fullname) missingFields.push("fullname");
  if (!email) missingFields.push("email");
  if (!phone) missingFields.push("phone");
  if (!address) missingFields.push("address");
  if (!password) missingFields.push("password");
  if (!confirmpassword) missingFields.push("confirmpassword");
  if (!role) missingFields.push("role");

  // Only require coverletter and preferences for job seekers
  if (role === "job seeker") {
    if (!coverletter) missingFields.push("coverletter");
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
      message: "Password must be between 8 and 32 characters.",
    });
  }

  if (password !== confirmpassword) {
    return next(new ErrorHandler("Password did not match", 400));
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
    preference: {
      first_preference,
      second_preference,
      third_preference,
    },
  };

  if (req.files && req.files.resume) {
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif"
    ];
    const resume = req.files.resume;

    if (!allowedMimeTypes.includes(resume.mimetype)) {
      return next(
        new ErrorHandler(
          "Unsupported file type. Please upload PDF, DOC, DOCX, JPG, PNG, or GIF.",
          400
        )
      );
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Set resource_type based on file type
    const resourceType = resume.mimetype.startsWith('image/') ? 'image' : 'raw';

    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        folder: "JOB_SEEKER_Resume",
        resource_type: resourceType,
      }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
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
});

export const login = catchasyncerror(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Email, password and role are required", 400));
  }

  const user = await User.findOne({ email }).select("+password +role");
  if (!user) {
    return next(new ErrorHandler("User not found. Check email.", 404));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Incorrect password", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("Invalid user role.", 400));
  }

  sendtoken(user, 200, res, "User logged in successfully.");
});

export const logout = catchasyncerror(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getuser = catchasyncerror(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const getalluser = catchasyncerror(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

export const updateprofile = catchasyncerror(async (req, res, next) => {
  const {
    fullname,
    email,
    phone,
    address,
    coverletter,
    first_preference,
    second_preference,
    third_preference,
  } = req.body;

  const newUserData = {
    fullname,
    email,
    phone,
    address,
    coverletter,
    preference: {
      first_preference,
      second_preference,
      third_preference,
    },
  };

  if (
    req.user.role === "job seeker" &&
    (!first_preference || !second_preference || !third_preference)
  ) {
    return next(
      new ErrorHandler("Please provide all preferred job niches.", 400)
    );
  }

  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif"
    ];
    if (!allowedMimeTypes.includes(resume.mimetype)) {
      return next(
        new ErrorHandler(
          "Unsupported file type. Please upload PDF, DOC, DOCX, JPG, PNG, or GIF.",
          400
        )
      );
    }
    if (req.user.resume && req.user.resume.public_id) {
      await cloudinary.uploader.destroy(req.user.resume.public_id, {
        resource_type: resume.mimetype.startsWith('image/') ? 'image' : 'raw',
      });
    }
    const uploadedResume = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        folder: "job_seeker_resume",
        resource_type: resume.mimetype.startsWith('image/') ? 'image' : 'raw',
      }
    );
    newUserData.resume = {
      public_id: uploadedResume.public_id,
      url: uploadedResume.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
    message: "Profile updated.",
  });
});


export const updatepasswords = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatched = await user.comparePassword(req.body.oldpassword);

  if (!isMatched) {
    return res.status(400).json({
      success: false,
      message: "Old password did not match",
    });
  }

  if (req.body.newpassword !== req.body.confirmpassword) {
    return next(new ErrorHandler("New password and confirm password do not match", 400));
  }

  if (req.body.newpassword.length < 8 || req.body.newpassword.length > 32) {
    return next(new ErrorHandler("Password must be between 8 and 32 characters.", 400));
  }

  const hashedPassword = await bcrypt.hash(req.body.newpassword, 10);
  user.password = hashedPassword;
  await user.save();

  sendtoken(user, 200, res, "Password updated successfully.");
});
