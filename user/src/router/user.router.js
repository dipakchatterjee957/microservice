import express from 'express';
import userController from '../controller/user.controller.js';
import validateToken from '../../../common_services/validateToen.js';
import requestValidator from '../../../common_services/requestValidator.js';
import validationSchema from '../../../common_services/validationSchema.js';
const userRouter = express.Router();

userRouter.get(`/getUserList`, validateToken, userController.getUserList);
userRouter.post(`/getMenuList`, validateToken, userController.getMenuList);
userRouter.post(`/login`, requestValidator(validationSchema.loginSchema), userController.login);
userRouter.post(`/reset`, requestValidator(validationSchema.resetSchema), userController.reset);
userRouter.post(`/userPrerequisite`, validateToken, userController.userPrerequisite);

export default userRouter;