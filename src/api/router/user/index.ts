const express = require('express')
const router = express.Router()
const userController = require('../../controller/userController')
import { check, validationResult } from "express-validator";

router.post('/register',userController.register) //user register
router.post('/login',userController.login) //user login

module.exports=router;