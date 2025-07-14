import jwt from 'jsonwebtoken';

export const sendtoken = (user, statuscode, res, message) => {
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_SECRET_EXPIRE }
    );
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statuscode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
}