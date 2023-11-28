const CustomErrorHandler = require('../utils/custom.error.handler')



// validate user name
const validateName = (req, res, next) => {
    try {
        if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

        if (!req.body.name) return next(new CustomErrorHandler(400, "Invalid Name"))

        const regex = /^[A-Za-z\s]+$/;
        const result = regex.test(req.body.name) && req.body.name.length >= 3 && req.body.name.length <= 25;

        if (!result) return next(new CustomErrorHandler(400, "Invalid Name"))

        next()
    } catch (error) {
        console.log(`middleware > validators > validateName: ${error.message}`)
        next(CustomErrorHandler.somethingWentWrong(error.message))
    }
}

// validate user email
const validateEmail = (req, res, next) => {
    console.log("PASS 1")
    if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

    // if (req.body.mobile) return next()
    if (!req.body.email) return next(new CustomErrorHandler(400, "Invalid Email **"))

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const result = regex.test(String(req.body.email).toLowerCase())

    if (!result) return next(new CustomErrorHandler(400, "Invalid Email"))

    next()
}

const validateMobile = (req, res, next) => {
    try {
        if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

        // if (req.body.email) return next()
        if (!req.body.mobile) return next(new CustomErrorHandler(400, "Invalid Mobile **"))

        const regex = /^\d{10}$/;
        const result = regex.test(req.body.mobile);

        if (!result) return next(new CustomErrorHandler(400, "Invalid Mobile ***"))

        next()
    } catch (error) {
        console.log(`middleware > validators > validateMobile: ${error.message}`)
        next(CustomErrorHandler.somethingWentWrong(error.message))
    }
};


// validate user password
const validatePassword = (req, res, next) => {
    console.log("PASS 2")
    if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

    if (!req.body.password) return next(new CustomErrorHandler(400, "Invalid Password"))

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{;,:'".<>/?]).{8,}$/;
    const result = regex.test(req.body.password);

    if (!result) return next(new CustomErrorHandler(400, "Invalid Password"))

    next()
};

const credentialsVerification = (req, res, next) => {
    const { _id, is_profile_verified, is_email_verified, is_mobile_verified, is_aadhar_verified } = req.user;

    if (!_id) return next(CustomErrorHandler.somethingWentWrong());

    if (!is_profile_verified) return next(CustomErrorHandler.unAuthorized("Please Wait Until Your Profile is been verified"))
    if (!is_email_verified) return next(CustomErrorHandler.unAuthorized("Please Verify Your Email"))
    if (!is_mobile_verified) return next(CustomErrorHandler.unAuthorized("Please Verify Your Mobile"))
    if (!is_aadhar_verified) return next(CustomErrorHandler.unAuthorized("Please Verify Your Aadhar"))

    next()
}

module.exports = {
    validateName, validateEmail, validateMobile, validatePassword, credentialsVerification
}