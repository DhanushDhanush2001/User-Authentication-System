const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please your Name"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    phone:{
        type:Number,
        required:[true,"Please your Mobile Number"]
    },
    gender:{
        type: [String],
        required:[true,'Please enter your Gender']
    },
    password:{
        type: String,
        required:[true, 'Please enter a password'],
    },
    resetPasswordToken : String,
    resetPasswordTokenExpire : Date,

    createdAt:{
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        return next();
    }

    try{
        this.password = await bcrypt.hash(this.password,10);
        next();
    } catch(error){
        next(error);
    }
});

// Method to generate JWT token
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
};

// Method to compare entered password with hashed password in DB
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.getResetToken =function(){
    // Generate Token
    const token = crypto.randomBytes(20).toString('hex');

    // Generate Hash and set to ResetPassword Token
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    // set token expire Tine

    this.resetPasswordTokenExpire = Date.now() + 30*60*1000;

    return token
}


// Create and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;