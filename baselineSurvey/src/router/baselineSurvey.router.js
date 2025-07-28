import express from 'express';
import baselineSurveyController from '../controller/baselineSurvey.controller.js';
import validateToken from '../../../common_services/validateToen.js';
const baselineSurveyRouter = express.Router();

baselineSurveyRouter.get(`/getBaselineSurveyList`, validateToken, baselineSurveyController.getBaselineSurveyList);

export default baselineSurveyRouter;