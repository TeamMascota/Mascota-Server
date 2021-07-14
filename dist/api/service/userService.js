"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/user/User"));
const Book_1 = __importDefault(require("../../models/book/Book"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const validator = require('validator');
require("../../models/user/User");
require("../../models/pet/Pet");
require("../../models/book/Book");
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
module.exports = {
    register: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        //See if user exists(check valid email)
        const errors = express_validator_1.validationResult(email);
        if (!errors.isEmpty()) {
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.EMPTY_ID };
        }
        if (!validator.isEmail(email) || !validator.isLength(password, { min: 8 })) {
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.WRONG_FORM };
        }
        let user = yield User_1.default.findOne({ email });
        if (user) {
            throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.ALREADY_ID };
        }
        const book = new Book_1.default();
        user = new User_1.default({
            email,
            password,
            book
        });
        yield book.save();
        //Encrpyt password
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        yield user.save();
    }),
    login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = express_validator_1.validationResult(email);
            if (!errors.isEmpty()) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.EMPTY_ID };
            }
            let user = yield User_1.default.findOne({ email }).populate({
                path: "pets"
            });
            if (!user) {
                //등록되지 않은 email
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.NO_USER };
            }
            const test = yield bcryptjs_1.default.compare(password, user.password);
            console.log('asdada' + test);
            if (!test) {
                throw { statusCode: statusCode.BAD_REQUEST, responseMessage: responseMessage.SIGN_IN_FAIL };
            }
            let petId = null;
            if (user.pets[0] != undefined) {
                petId = user.pets[0]._id;
            }
            return { userId: user._id, petId: petId };
        }
        catch (err) {
            throw err;
        }
    })
};
//# sourceMappingURL=userService.js.map