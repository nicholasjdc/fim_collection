const express = require('express')

const router = express.Router()
//controller functions
const {signupUser, loginUser} = require('../controller/sqlUserController')
const {getGoogleToken, getRefreshToken} = require('../controller/googleAuthController')
//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//googleAuth routes
router.post('/google/auth', getGoogleToken)
router.post('/google/refresh', getRefreshToken)

module.exports = router