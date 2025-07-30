import express from 'express';
import regionBranchController from '../controller/regionBranch.controller.js';
import validateToken from '../../../common_services/validateToen.js';

const regionBranchRouter = express.Router();

regionBranchRouter.post(`/saveOrUpdateOrDeleteRegion`, validateToken, regionBranchController.saveOrUpdateOrDeleteRegion);
regionBranchRouter.post(`/saveOrUpdateOrDeleteBranch`, validateToken, regionBranchController.saveOrUpdateOrDeleteBranch);
regionBranchRouter.post(`/getBranchDetails`, validateToken, regionBranchController.getBranchDetails);


export default regionBranchRouter