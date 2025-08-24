import { catchasyncerror } from "../Middlewares/catchasyncerror.js";
import ErrorHandler from "../Middlewares/error.js";
import { Job } from "../Models/job.model.js";

export const postjob = catchasyncerror(async (req, res, next) => {
  const {
    title,
    jobtype,
    location,
    companyname,
    introduction,
    responsibilities,
    qualification,
    offers,
    salary,
    hiringmultiple,
    personalwebsitetitle,
    personalwebsiteurl,
    preference,
  } = req.body;

  // Build personalwebsite object as per schema
  const personalwebsite = {
    title: personalwebsitetitle,
    url: personalwebsiteurl,
  };

  if (
    !title ||
    !jobtype ||
    !location ||
    !companyname ||
    !responsibilities ||
    !qualification ||
    !salary ||
    !preference
  ) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }
  if (
    (personalwebsitetitle && !personalwebsiteurl) ||
    (!personalwebsitetitle && personalwebsiteurl)
  ) {
    return next(
      new ErrorHandler(
        "Provide both the website url and title, or leave both blank.",
        400
      )
    );
  }
  const postedby=req.user._id;
const job=await Job.create({
    title,
    jobtype,
    location,
    companyname,
    introduction,
    responsibilities,
    qualification,
    offers,
    salary,
    hiringmultiple,
    personalwebsite: {
      title: personalwebsitetitle,
      url: personalwebsiteurl
    },
    preference,
    postedby
})
res.status(201).json({
    success: true,
    message: "Job posted successfully.",
    job,
  });



});

export const getalljobs=catchasyncerror(async(req,res,next)=>{
    const { city, preference, keyword } = req.query;
    const query = {};
    if (city) {
        query.location = { $regex: city, $options: "i" };
    }
    if (preference) {
        query.preference = { $regex: preference, $options: "i" };
    }
    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { companyname: { $regex: keyword, $options: "i" } },
            { introduction: { $regex: keyword, $options: "i" } },
        ];
    }
    const jobs = await Job.find(query);
    res.status(200).json({
        success: true,
        jobs,
        count: jobs.length,
    });
});

    export const getmyjob=catchasyncerror(async(req,res,next)=>{
    const jobs=await Job.find({
      postedby:req.user._id
    })
    res.status(200).json({
      success:true,
      jobs
    })
    })

    export const deletejob=catchasyncerror(async(req,res,next)=>{
        const {id}=req.params;
        const job=await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("JOB COULD NOT FOUND!",400))

        }
        await job.deleteOne();
        res.status(200).json({
            success: true,
    message: "Job deleted.",
    job

        })
    })

    export const getASingleJob = catchasyncerror(async (req, res, next) => {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
          return next(new ErrorHandler("Job not found.", 404));
        }
        res.status(200).json({
          success: true,
          job,
        });
      });

      


