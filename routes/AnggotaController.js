const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const AnggotaController = require ('../controller/AnggotaController')




module.exports = router