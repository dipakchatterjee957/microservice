import express from 'express';
import userController from '../controller/user.controller.js';
import validateToken from '../../../common_services/validateToen.js';
const userRouter = express.Router();

// userRouter.get(`/getUserList`, validateToken, userController.getUserList);
userRouter.get(`/getUserList`, userController.getUserList);

export default userRouter;