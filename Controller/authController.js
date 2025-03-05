const catchAsyncError = require('../Middleware/catchAsyncError');
const User = require('../Models/userModel');
const sendEmail = require('../Utils/email');
const ErrorHandler = require('../Utils/errorHandler');
const sendToken = require('../Utils/jwt');
const crypto = require('node:crypto');


// Register User - /api/v1/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
    try {
        const { username, email, password, phone, gender } = req.body;

        if (!username || !email || !password || !phone || !gender) {
            return res.status(400).json({ error: "All fields are required." });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use." });
        }
        const user = await User.create({
            name: username,
            email,
            password,
            phone,
            gender
        });

        sendToken(user, 201, res);
    } catch (error) {
        next(error)
    }
})


// Login User -  /api/v1/login

exports.loginUser = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new ErrorHandler('Please enter email & password', 400))
        }

        //finding user from Database

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return next(new ErrorHandler('Invalid email or password', 401))
        }
        if (!await user.isValidPassword(password)) {
            return next(new ErrorHandler('Invalid email or password', 401))
        }

        sendToken(user, 201, res)
    } catch (error) {
        next(error)
    }

})

// LogOut - /api/v1/logout

exports.logoutUser = (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
            .status(200)
            .json({
                success: true,
                message: 'Logged out'
            });
    } catch (error) {
        next(error);
    }
}

//Forgot Password - /api/v1/password/forgot

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetToken();
    user.save({ validateBeforeSave: false })

    
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    // Create reset url
    
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Recovery",
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        });
    } catch (error) {
        // Clear the reset token if sending email fails
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message), 500)
    }
});



//Reset Password - /api/v1/password/reset/:token

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordTokenExpire: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return next(new ErrorHandler('Password does not match'));
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler('Password does not match'));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false })

        sendToken(user, 201, res)
    } catch (error) {
        next(error)
    }
});
