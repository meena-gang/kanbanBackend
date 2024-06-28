const express = require('express');
const userRouter = express.Router();


const {registrationHandler,loginHandler} = require('../controllers/user.controller')

userRouter.post('/register',registrationHandler)

userRouter.post('/login', loginHandler)

module.exports = userRouter;