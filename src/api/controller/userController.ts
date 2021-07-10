const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const userService = require('../service/userService')
import User from '../../models/user/User'
import Pet from '../../models/pet/Pet'

module.exports = {
    //register user
    register: async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await userService.register(email, password);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGH_UP_SUCCESS, result))
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            console.error(err)
            res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await userService.login(email, password);
            if (result) {
                res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGH_IN_SUCCESS, ""))
            } else {
                return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.MISS_MATCH_PW))
            }

        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            console.error(err)
            res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage))
        }
    }
}

//return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.MISS_MATCH_PW))