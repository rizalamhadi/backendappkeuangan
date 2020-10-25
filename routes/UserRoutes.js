const express = require("express");
const router = express.Router();
const { welcome } = require('../middleware/Auth');

const UserController = require('../controller/UserController');


router.get('/getuser', welcome, UserController.get_All_User)
router.get('/getuser/:User_Id', welcome, UserController.get_User_ById)
router.post('/signup', welcome, UserController.signup)
router.post('/updateuser', welcome, UserController.update_UserAndPermission)
router.get('/deletuser/:user_id', welcome, UserController.delete_User_ById)

module.exports = router