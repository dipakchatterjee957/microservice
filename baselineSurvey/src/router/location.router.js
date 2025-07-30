import express from 'express';
import locationController from '../controller/location.controller.js';
import validateToken from '../../../common_services/validateToen.js';

const locationRouter = express.Router();

locationRouter.post(`/getRegionList`, validateToken, locationController.getRegionList);
locationRouter.post(`/getBranchList`, validateToken, locationController.getBranchList);
locationRouter.post(`/getStateList`, validateToken, locationController.getStateList);
locationRouter.post(`/getStateWiseRegionBranchList`, validateToken, locationController.getStateWiseRegionBranchList);
locationRouter.post(`/getProjectList`, validateToken, locationController.getProjectList);
locationRouter.post(`/getDistrictList`, validateToken, locationController.getDistrictList);
locationRouter.post(`/getBlockList`, validateToken, locationController.getBlockList);
locationRouter.post(`/getBlockGpVillageList`, validateToken, locationController.getBlockGpVillageList);
locationRouter.post(`/getBlockGpVillageListByBranchId`, validateToken, locationController.getBlockGpVillageListByBranchId);

//District
locationRouter.post(`/saveOrUpdateOrDeleteDistrict`, validateToken, locationController.saveOrUpdateOrDeleteDistrict);
//Block
locationRouter.post(`/getBlockDetails`, validateToken, locationController.getBlockDetails);
locationRouter.post(`/saveOrUpdateOrDeleteBlock`, validateToken, locationController.saveOrUpdateOrDeleteBlock);
// GP/ Municipality
locationRouter.post(`/getGpListByBlockId`, validateToken, locationController.getGpListByBlockId);
locationRouter.post(`/saveOrUpdateOrDeletegpMunicipality`, validateToken, locationController.saveOrUpdateOrDeletegpMunicipality);
//Village
locationRouter.post(`/getVillageListByGpId`, validateToken, locationController.getVillageListByGpId);
locationRouter.post(`/saveOrUpdateOrDeleteVillage`, validateToken, locationController.saveOrUpdateOrDeleteVillage);
//Branch-Village Map
locationRouter.post(`/getVillageListByBranchId`, validateToken, locationController.getVillageListByBranchId);
locationRouter.post(`/getBlockListForBranchVillageMap`, validateToken, locationController.getBlockListForBranchVillageMap);
locationRouter.post(`/getUnmappedVillageByGpId`, validateToken, locationController.getUnmappedVillageByGpId);
locationRouter.post(`/mapUnmapBranchVillage`, validateToken, locationController.mapUnmapBranchVillage);

//Donor & Project List
locationRouter.post(`/getProjectDonorList`, validateToken, locationController.getProjectDonorList);



export default locationRouter