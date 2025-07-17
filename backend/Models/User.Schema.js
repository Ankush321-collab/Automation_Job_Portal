import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcrypt";


const UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minLength:[3,"Name must contain 3 letter Atleast"],
        maxLength:[30,"Name cannot excedds this"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide valid email"]
    },

    phone:{
        type:String,
        required:true,
        minlength:[10,"Phone number must be 10 digits"],
        maxlength:[10,"Phone number must be 10 digits"]
    },

    address:{
        type:String,
        required:true,
    },

    preference:{
        first_preference:String,
        second_preference:String,
        third_preference:String,
    },
    password:{
        type: String,
        required: true,
        select: false
    },

resume:{
    public_id:{ type: String, default: "" },
    url:{ type: String, default: "" },
},
coverletter:{
    type:String,
},
role:{
    type:String,
    required:true,
    enum:["job seeker","employer"]
},

    
createdAt: {
    type: Date,
    default: Date.now,
},

    }

);

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User=mongoose.model("Users",UserSchema)

//this is for hasing password

// Note: If you want to use 'fullname' as 'name' in application logic, map it in the controller when needed.

