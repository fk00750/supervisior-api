const CustomErrorHandler = require("../../utils/custom.error.handler");
const { SupervisiorManager } = require("../../utils/helper_functions");
const IssueAccessToken = require("../../utils/jwt/issue.jwt.token");
const supervisiorManager = new SupervisiorManager()

const login = async (req, res, next) => {
    try {
        const { email, mobile, password } = req.body;

        const supervisior = email
            ? await supervisiorManager.findUserByEmail(email)
            : mobile
                ? await supervisiorManager.findUserByMobile(mobile)
                : null;

        if (!supervisior) return CustomErrorHandler.notFound("User Not Found");

        // check password
        const isPasswordValid = supervisiorManager.verifyPassword(password, supervisior.password)

        if (!isPasswordValid) return CustomErrorHandler.wrongCredentials("Invalid Password")

        // issue token
        const token = await IssueAccessToken.issueAccessToken(supervisior._id)

        if (!token) return CustomErrorHandler.somethingWentWrong()

        res.status(200).json({
            success: true,
            token: token,
            message: "Login successful",
        });
    } catch (error) {
        console.error(`Error: src > controllers > auth > index.js > login - ${error.message}`);
        next(error); // Pass the error to the next middleware or error handler
    }
}

const register = async (req, res, next) => {
    try {
        const { name, email, mobile, aadharNumber, password } = req.body;

        const supervisior = email
            ? await supervisiorManager.findUserByEmail(email)
            : mobile
                ? await supervisiorManager.findUserByMobile(mobile)
                : null;

        if (supervisior) return next(CustomErrorHandler.alreadyExist("user already exist"))

        const isSupervisiorCreated = await supervisiorManager.createSupervisior(name, email, mobile, aadharNumber, password)

        if (!isSupervisiorCreated) return next(CustomErrorHandler.somethingWentWrong())

        res.status(200).json({
            message: "success"
        })
    } catch (error) {
        console.log(`Error: src > controllers > auth > index.js > register - ${error.message}`)
        next(error)
    }
}

const verifyMobile = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(`Error: src > controllers > auth > index.js > verifyMobile - ${error.message}`)
        next(error)
    }
}

const verifyAadhar = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(`Error: src > controllers > auth > index.js > verifyAadhar - ${error.message}`)
        next(error)
    }
}

module.exports = { register, login, verifyMobile, verifyAadhar }