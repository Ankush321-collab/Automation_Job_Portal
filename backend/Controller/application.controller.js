import { catchasyncerror } from '../Middlewares/catchasyncerror.js';
import ErrorHandler from '../Middlewares/error.js';
import { application } from '../Models/application.schema.js';
import { Job } from '../Models/job.model.js';
import { v2 as cloudinary } from 'cloudinary';

export const postapplication = catchasyncerror(async (req, res, next) => {
  const { id } = req.params;
  const { fullname, email, phone, address, coverletter } = req.body;

  if (!fullname || !email || !phone || !address || !coverletter) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const jobseekerinfo = {
    id: req.user._id,
    email,
    fullname,
    phone,
    address,
    coverletter,
    role: "job seeker",
  };

  const jobdetails = await Job.findById(id);
  if (!jobdetails) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  const isalreadyapplied = await application.findOne({
    "jobinfo.jobid": id,
    "jobseekerinfo.id": req.user._id,
  });

  if (isalreadyapplied) {
    return next(
      new ErrorHandler("You have already applied for this job.", 400)
    );
  }

  // If it contains resume inside files
  if (req.files && req.files.resume) {
    const { resume } = req.files;

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

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const resourceType = resume.mimetype.startsWith('image/') ? 'image' : 'raw';

    try {
      const fixedPath = resume.tempFilePath.replace(/\\/g, '/');
      const cloudinaryResponse = await cloudinary.uploader.upload(
        fixedPath,
        {
          folder: "JOB_SEEKER_Resume",
          resource_type: resourceType,
        }
      );

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(new ErrorHandler("Failed to upload resume to Cloudinary.", 500));
      }

      jobseekerinfo.resume = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return next(new ErrorHandler("Please upload your resume.", 500));
    }
  } else {
    // Fallback to saved resume in user
    if (!req.user.resume || !req.user.resume.url) {
      return next(new ErrorHandler("Please upload your resume.", 400));
    }

    jobseekerinfo.resume = {
      public_id: req.user.resume.public_id,
      url: req.user.resume.url
    };
  }

  // Save application
  const employeinfo = {
    id: jobdetails.postedby,
    role: "employer",
  };
  const jobinfo = {
    jobid: id,
    jobTitle: jobdetails.title,
  };
  const newApplication = await application.create({
    jobseekerinfo,
    employeinfo,
    jobinfo,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted.",
    application: newApplication,
  });
});

export const employergetallapplication = catchasyncerror(async (req, res, next) => {
  const { _id } = req.user;
  const allApplications = await application.find({
    "employeinfo.id": _id,
    "deletedby.employer": false,
  });

  res.status(200).json({
    success: true,
    application: allApplications,
  });
});

export const jobseekergetallapplication = catchasyncerror(async (req, res, next) => {
  const { _id } = req.user;
  const allApplications = await application.find({
    "jobseekerinfo.id": _id,
    "deletedby.jobseeker": false,
  });

  res.status(200).json({
    success: true,
    application: allApplications,
  });
});

export const deleteapplication = catchasyncerror(async (req, res, next) => {
  const { id } = req.params;
  const app = await application.findById(id);

  if (!app) {
    return next(new ErrorHandler("Application not found", 404));
  }

  const { role } = req.user;

  switch (role) {
    case "job seeker":
      app.deletedby.jobseeker = true;
      await app.save();
      break;
    case "employer":
      app.deletedby.employer = true;
      await app.save();
      break;
    default:
      console.log("Unknown role in application delete function");
      break;
  }

  if (app.deletedby.employer === true && app.deletedby.jobseeker === true) {
    await app.deleteOne();
  }

  res.status(200).json({
    success: true,
    message: "Application Deleted.",
  });
});
