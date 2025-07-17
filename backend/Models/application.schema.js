import mongoose from "mongoose";
import validator from 'validator'

 const applicationSchema=new mongoose.Schema({
    jobseekerinfo:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        fullname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            validate:[validator.isEmail,"Please provide a valid email."],
        },
        phone:{
            type:String,
            required:true,
            maxlength:[10,"number cannot exceeds 10 digit"]
        },
        address:{
            type:String,
            required:true,
        },
        resume:{
            public_id:{ type: String, default: "" },
            url:{ type: String, default: "" },
        },
        coverletter:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:["job seeker"],
            required:true
        }
    },
    employeinfo:{
        id:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:"User",
        },
        role:{
            type:String,
            enum:["employer"],
            required:true
        }
    },
    jobinfo:{
        jobid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        jobTitle:{
            type:String,
            required:true
        }
    },
    deletedby:{
        jobseeker:{
            type:Boolean,
            default:false,
        },
        employer:{
            type:Boolean,
            default:false,
        }
    }

 });
 export const application=mongoose.model("Application",applicationSchema);