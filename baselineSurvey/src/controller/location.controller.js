import locationService from '../service/location.service.js';
import utils from '../../../common_services/utils.js';

export default new class Locationcontroller {

    getRegionList = async (req, res) => {
        try {
            const data = await locationService.getRegionList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getBranchList = async (req, res) => {
        try {
            const data = await locationService.getBranchList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getStateList = async (req, res) => {
        try {
            const data = await locationService.getStateList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getStateWiseRegionBranchList = async (req, res) => {
        try {
            const data = await locationService.getStateWiseRegionBranchList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };


    getProjectList = async (req, res) => {
        try {
            const data = await locationService.getProjectList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };


    getDistrictList = async (req, res) => {
        try {
            const data = await locationService.getDistrictList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getBlockList = async (req, res) => {
        try {
            const data = await locationService.getBlockList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getBlockGpVillageList = async (req, res) => {
        try {
            const data = await locationService.getBlockGpVillageList(req.body, req.user);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getBlockGpVillageListByBranchId = async (req, res) => {
        try {
            const data = await locationService.getBlockGpVillageListByBranchId(req.body, req.user);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    saveOrUpdateOrDeleteDistrict = async (req, res) => {
        try {
            if (req.body.district_master_id == 0 && req.body.active_flag == 'A') {
                const data = await locationService.saveDistrict(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.district_master_id != 0 && req.body.active_flag == 'A') {
                const data = await locationService.updateDistrict(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.district_master_id != 0 && req.body.active_flag == 'D') {
                const data = await locationService.deleteDistrict(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else {
                return utils.sendResponse(res, null, false);
            }
        } catch (error) {
            return utils.sendResponse(res, null, false, error.message);
        }
    }

    getBlockDetails = async (req, res) => {
        try {
            const data = await locationService.getBlockDetails(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    saveOrUpdateOrDeleteBlock = async (req, res) => {
        try {
            if (req.body.block_master_id == 0 && req.body.active_flag == 'A') {
                const data = await locationService.saveBlock(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.block_master_id != 0 && req.body.active_flag == 'A') {
                const data = await locationService.updateBlock(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.block_master_id != 0 && req.body.active_flag == 'D') {
                const data = await locationService.deleteBlock(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else {
                return utils.sendResponse(res, null, false);
            }
        } catch (error) {
            return utils.sendResponse(res, null, false, error.message);
        }
    }

    getGpListByBlockId = async (req, res) => {
        try {
            const data = await locationService.getGpListByBlockId(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    saveOrUpdateOrDeletegpMunicipality = async (req, res) => {
        try {
            if (req.body.gp_master_id == 0 && req.body.active_flag == 'A') {
                const data = await locationService.saveGpMunicipality(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.gp_master_id != 0 && req.body.active_flag == 'A') {
                const data = await locationService.updateGpMunicipality(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.gp_master_id != 0 && req.body.active_flag == 'D') {
                const data = await locationService.deleteGpMunicipality(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else {
                return utils.sendResponse(res, null, false);
            }
        } catch (error) {
            return utils.sendResponse(res, null, false, error.message);
        }
    }

    getVillageListByGpId = async (req, res) => {
        try {
            const data = await locationService.getVillageListByGpId(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    saveOrUpdateOrDeleteVillage = async (req, res) => {
        try {
            if (req.body.village_master_id == 0 && req.body.active_flag == 'A') {
                const data = await locationService.saveVillage(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.village_master_id != 0 && req.body.active_flag == 'A') {
                const data = await locationService.updateVillage(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.village_master_id != 0 && req.body.active_flag == 'D') {
                const data = await locationService.deleteVillage(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else {
                return utils.sendResponse(res, null, false);
            }
        } catch (error) {
            return utils.sendResponse(res, null, false, error.message);
        }
    }

    getVillageListByBranchId = async (req, res) => {
        try {
            const data = await locationService.getVillageListByBranchId(req.body, req.user);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getBlockListForBranchVillageMap = async (req, res) => {
        try {
            const data = await locationService.getBlockListForBranchVillageMap(req.body, req.user);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getUnmappedVillageByGpId = async (req, res) => {
        try {
            const data = await locationService.getUnmappedVillageByGpId(req.body, req.user);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    mapUnmapBranchVillage = async (req, res) => {
        try {
            if (req.body.map_unmap_status == 'M') {
                const data = await locationService.mapBranchVillage(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else {
                const data = await locationService.unmapBranchVillage(req.body, req.user);
                return utils.sendResponse(res, data, true);
            }
        } catch (error) {
            return utils.sendResponse(res, null, false, error.message);
        }
    }

    getProjectDonorList = async (req, res) => {
        try {
            const data = await locationService.getProjectDonorList(req.body, req.user);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };
}