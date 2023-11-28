const { register, login } = require("../controllers/auth")
const { supervisiorProfile, registerWorker, getWorkers, getWorker } = require("../controllers/supervisior")
const { validateName, validateEmail, validateMobile, validatePassword, credentialsVerification } = require("../middlewares/validators")
const passport = require('passport')

const Router = require("express").Router()

// auth
Router.post('/register-supervisior', validateName, validateEmail, validateMobile, validatePassword, register)
Router.post('/login-supervisior', validateMobile, validatePassword, login)


// supervisior
Router.get('/supervisior-profile', passport.authenticate("jwt-access", { session: false }), supervisiorProfile)
Router.get('/register-worker', passport.authenticate("jwt-access", { session: false }), credentialsVerification, registerWorker)
Router.get('/get-workers', passport.authenticate("jwt-access", { session: false }), credentialsVerification, getWorkers)
Router.get('/get-worker/:workerId', passport.authenticate("jwt-access", { session: false }), credentialsVerification, getWorker)

module.exports = Router