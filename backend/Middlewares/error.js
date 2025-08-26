class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode;
    }
}

export const errormiddleware=(err,req,res,next)=>{
    err.message=err.message ||"Internal Server Error";
    err.statuscode=err.statuscode ||500;
    
    // Log error for debugging
    console.error('Error:', err);


if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)}Entered`;
    err=new ErrorHandler(message,400);
}

if(err.name==="JsonWebTokenError"){
    const message="json web token is invalid,try again";
    err=new ErrorHandler(message,400)
}
if(err.name=='TokenExpiredError'){
    const message=`json web token is expired,try agian!`;
    err=new ErrorHandler(message,400);
}

if(err.name=="CastError"){
    const message=`invalid ${err.path}`;
    err=new ErrorHandler(message,400);
}

const errormessage=err.errors?Object.values(err.errors).map((error)=>
error.message).join(" "):err.message


return res.status(err.statuscode).json({
    success: false,
    // message: err.message,
    message: errorMessage,
  });
}

  export default ErrorHandler;

