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
Object.defineProperty(exports, "__esModule", { value: true });
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const userService = require('../service/userService');
module.exports = {
    //register user
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const result = yield userService.register(email, password);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGH_UP_SUCCESS, result));
        }
        catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            console.error(err);
            res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const result = yield userService.login(email, password);
            console.log('얘가나오면 안되는데 : ', result);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGH_IN_SUCCESS));
        }
        catch (err) {
            console.log('bbbbb : ' + err.statusCode);
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            console.error('!!!!!' + err);
            res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    })
};
//# sourceMappingURL=userController.js.map