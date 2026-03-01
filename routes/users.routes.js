var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const uploadfile = require('../middleware/uploadfile');
const {requireAuthUser} = require('../middleware/authMiddlewares');
/* GET users listing. */
router.get('/esm', userController.esm);
router.get('/getAllUsers', requireAuthUser,userController.getAllUsers); //protected route
router.post('/singin', userController.addUser); //signup route (unprotected)
router.post('/addAdmin', requireAuthUser,userController.addAdmin); //route to add admin (unprotected, should be protected in real app)
router.delete('/deleteUser/:id',requireAuthUser, userController.deleteUser); //protected route
router.put('/updateUser/:id',requireAuthUser, userController.updateUser); //protected route
router.post('/addUserWithPhoto',requireAuthUser, uploadfile.single('photo'), userController.addUserWithPhoto); //protected route
router.post('/login', userController.login);
router.get('/getAuthUser', requireAuthUser, userController.getAuthUser); //protected route + session storage
module.exports = router;
