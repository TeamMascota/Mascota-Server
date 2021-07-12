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

            user = new User({
                email,
                password
            });

            //Encrpyt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            //Create book object
            const book = new Book()

            //Create tableContents object
            const tableContents = new TableContents()

            //Create firstPartTableContents object
            const firstPart = new FirstPartTableContents()
            tableContents.setFirstPartTableContents(firstPart)
            book.setTableContents(tableContents)
            user.setBook(book);

            //db save
            await user.save();

            return { bookId: book._id };
        },
    login: async (email, password) => {
        try {
            const errors = validationResult(email);
            if (!errors.isEmpty()) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.EMPTY_ID };
            }
            let user = await User.findOne({ email });
            if (!user) {
                //등록되지 않은 email
                throw { statusCode: statusCode.NO_CONTENT, responseMessage: responseMessage.NO_USER };
            }

            const test = await bcrypt.compare(password, user.password)
            console.log('asdada' + test)
            if (!test) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.SIGN_IN_FAIL };
            }

        } catch (err) {
            throw err
        }
    }
}