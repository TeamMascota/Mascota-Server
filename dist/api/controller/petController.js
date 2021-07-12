var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var util = require('../../modules/util');
var responseMessage = require('../../modules/responseMessage');
var statusCode = require('../../modules/statusCode');
const petService = require('../service/petService');
module.exports = {
    registerPet: (req, res) => __awaiter(this, void 0, void 0, function* () {
        let reqData = req.body;
        const images = req.files.map(img => img.location);
        try {
            yield petService.registerPet(reqData, images);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REGISTER_PET, ""));
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
};
//# sourceMappingURL=petController.js.map