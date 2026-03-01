var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const uploadfile = require('../middleware/uploadfile');
const {requireAuthUser} = require('../middleware/authMiddlewares');
/* GET users listing. */
router.get('/esm', userController.esm);
router.get('/getAllUsers', userController.getAllUsers);
router.post('/addUser', userController.addUser);
router.post('/addAdmin', userController.addAdmin);
router.delete('/deleteUser/:id', userController.deleteUser);
router.put('/updateUser/:id', userController.updateUser);
router.post('/addUserWithPhoto', uploadfile.single('photo'), userController.addUserWithPhoto);
router.post('/login', userController.login);
router.get('/getAuthUser', requireAuthUser, userController.getAuthUser);
module.exports = router;
