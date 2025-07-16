import mongoose from "mongoose";


const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    jobtype:{
        type:String,
        required:true,
        enum:["full_time","part_time"]

    },
    location:{
        type:String,
        required:true,
    },
    companyname:{
        type:String,
        required:true
    },
    introduction:{
        type:String,
    },
    responsibilities:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true
    },
    offers:{
        type:String,

    },
    salary:{
        type:String,
        required:true,
    },
    hiringmultiple: {
        type: String,
        default: "No",
        enum: ["Yes", "No"],
      },
      personalwebsite:{
        title:String,
        url:String
      },
      preference:{
        type:String,
        required:true
      },
      newlettersent:{
        type:Boolean,
        default:false,
      },
      jobpostedon:{
        type:Date,
        default:Date.now,
      },
      postedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      }
})

export const Job=mongoose.model("Jobs",jobSchema)