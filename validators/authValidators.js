const { body } = require("express-validator");

const registerValidation = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ max: 25 })
        .withMessage("Username should not be longer than 25 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 30 })
        .withMessage("Password must be between 6 and 30 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,30}$/)
        .withMessage(
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        ),

    body("gender")
        .default("")
         .customSanitizer((value) => (Array.isArray(value) ? value[0] : value))
        .isString()
        .withMessage("Gender should be a string")
        .isIn(["Male", "Female", "Other"])
        .withMessage("Gender value is invalid"),

    body("phone")
        .withMessage("Phone number is required")
        .custom((value) => {
            const regex = /^[6-9]\d{9}$/;
            if (!regex.test(value)) {
                throw new Error("Invalid Indian mobile number");
            }
            return true;
        }),
];

const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 30 })
        .withMessage("Password must be between 6 and 30 characters"),
];

const forgotPasswordValidation = [
    body("email").trim().notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address"),
];

const resetPasswordValidation = [
    body("password").trim().notEmpty().withMessage("Password is required")
        .isLength({ min: 6, max: 30 }).withMessage("Password must be between 6 and 30 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,30}$/)
        .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
];

module.exports = { registerValidation, loginValidation,forgotPasswordValidation,resetPasswordValidation};
