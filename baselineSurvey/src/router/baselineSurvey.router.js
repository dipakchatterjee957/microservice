import express from 'express';
import baselineSurveyController from '../controller/baselineSurvey.controller.js';
import validateToken from '../../../common_services/validateToen.js';

const baselineSurveyRouter = express.Router();

baselineSurveyRouter.post(`/getPrerequisite`, validateToken, baselineSurveyController.getPrerequisite);
baselineSurveyRouter.post(`/getEducatorByUserId`, validateToken, baselineSurveyController.getEducatorByUserId);
baselineSurveyRouter.post(`/getBaselineSurveyList`, validateToken, baselineSurveyController.getBaselineSurveyList);
baselineSurveyRouter.post(`/checkBaselineSurveyStatus`, validateToken, baselineSurveyController.checkBaselineSurveyStatus);
baselineSurveyRouter.post(`/saveOrUpdateOrDeleteBaselineSurvey`, validateToken, baselineSurveyController.saveOrUpdateOrDeleteBaselineSurvey);

baselineSurveyRouter.post(`/getBaselineSurveyReport`, validateToken, baselineSurveyController.getBaselineSurveyReport);
baselineSurveyRouter.post(`/getBaselineSurveyReportByRegion`, validateToken, baselineSurveyController.getBaselineSurveyReportByRegion);


export default baselineSurveyRouter