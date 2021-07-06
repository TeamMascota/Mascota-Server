import { Request, Response, NextFunction } from 'express'
import User from '../../models/user/User'
import Book from '../../models/book/Book'
import Pet from '../../models/pet/Pet'
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

            user = new User({
                email,
                password
            });

            //Encrpyt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            //Create book object
            const book = new Book()
            user.setBook(book);

            //db save
            await user.save();

            return {bookId:book._id};
        },
    login: async (email, password) => {
        const errors = validationResult(email);
        if (!errors.isEmpty()) {
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.EMPTY_ID };
        }
        let user = await User.findOne({ email });
        if (!user) {
            //등록되지 않은 email
            throw { statusCode: statusCode.NO_CONTENT, responseMessage: responseMessage.NO_USER };
        }
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
                return console.log(err)
            } else if (!isMatch) {
                //return fail
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.MISS_MATCH_PW };
            } else {
                //result==true
                console.log("password matches");
                return responseMessage.SIGN_IN_SUCCESS;
            }
        })
    }
}