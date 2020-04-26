const express=require('express');

const isAuth=require('../middleware/auth');

const userController=require('../controllers/user');

const userRoute=new express.Router();

userRoute.post('/SignUp',userController.userSignUp);

userRoute.post('/SignIn',userController.userSignIn);

userRoute.get('/Logout',userController.logout);

userRoute.post('/loginUsingJWT',isAuth,userController.getUserDataOnLogin);

userRoute.post('/UserPhoto',userController.userPhoto);

userRoute.post('/ForgetPassword',userController.forgetPassword);

userRoute.post('/ResetPassword',userController.resetPassword);

userRoute.patch('/updatecontracts',userController.updateContracts);

userRoute.patch('/updatecontributions',userController.updateContributions);

module.exports=userRoute;