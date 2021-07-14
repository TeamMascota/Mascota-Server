"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
router.post('/register/', userController.register); //user register
router.post('/login', userController.login); //user login
module.exports = router;
//# sourceMappingURL=index.js.map