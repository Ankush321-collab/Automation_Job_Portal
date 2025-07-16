import jwt from "jsonwebtoken";
import { catchasyncerror } from "./catchasyncerror.js";
import ErrorHandler from "./error.js";
import { User } from "../Models/User.Schema.js";

export const isauthenticated=catchasyncerror(async(req,res,next)=>{
    //get token 
    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("User is not authenticated",400))
        
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);

    next();
})

export const isAuthorized = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `${req.user.role} not allowed to access this resource.`
          )
        );
      }
      next();
    };
  };





