import { Request, Response, NextFunction, response } from 'express'
import User from '../../models/user/User'
import Book from '../../models/book/Book'
import Pet from '../../models/pet/Pet'
import FirstPartTableContents from '../../models/tableContents/FirstPartTableContents'
import TableContents from '../../models/tableContents/TableContents'
import bcrypt from 'bcryptjs'
import { check, validationResult } from "express-validator";
const validator = require('validator');
require("../../models/user/User")
require("../../models/pet/Pet")
require("../../models/book/Book")
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')

module.exports = {
    register:
        async (email, password) => {
            //See if user exists(check valid email)
            const errors = validationResult(email);
            if (!errors.isEmpty()) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.EMPTY_ID };
            }
            if (!validator.isEmail(email) || !validator.isLength(password, { min: 8 })) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.WRONG_FORM };
            }

            let user = await User.findOne({ email });
            if (user) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.ALREADY_ID };
            }

            const book=new Book()
            user = new User({
                email,
                password,
                book
            });
            await book.save()

            //Encrpyt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.save()
        },
    login: async (email, password) => {
        try {
            const errors = validationResult(email);
            if (!errors.isEmpty()) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.EMPTY_ID };
            }
            let user = await User.findOne({ email }).populate({
                path : "pets"
            });
            if (!user) {
                //등록되지 않은 email
                throw { statusCode: statusCode.NO_CONTENT, responseMessage: responseMessage.NO_USER };
            }

            const test = await bcrypt.compare(password, user.password)
            console.log('asdada' + test)
            if (!test) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.SIGN_IN_FAIL };
            }
            let petId = null
            if(user.pets[0] != undefined){
                petId = user.pets[0]._id
            }
            return { userId : user._id, petId : petId}
        } catch (err) {
            throw err
        }
    }
}