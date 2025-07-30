import regionBranchService from '../service/regionBranch.service.js';
import utils from '../../../common_services/utils.js';

export default new class RegionBranchcontroller {

    saveOrUpdateOrDeleteRegion = async (req, res) => {
        try {
            if (req.body.region_master_id == 0 && req.body.active_flag == 'A') {
                const data = await regionBranchService.saveRegion(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.region_master_id != 0 && req.body.active_flag == 'A') {
                const data = await regionBranchService.updateRegion(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.region_master_id != 0 && req.body.active_flag == 'D') {
                const data = await regionBranchService.deleteRegion(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else {
                return utils.sendResponse(res, null, false);
            }
        } catch (error) {
            return utils.sendResponse(res, null, false, error.message);
        }
    }

    saveOrUpdateOrDeleteBranch = async (req, res) => {
        try {
            if (req.body.branch_master_id == 0 && req.body.active_flag == 'A') {
                const data = await regionBranchService.saveBranch(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.branch_master_id != 0 && req.body.active_flag == 'A') {
                const data = await regionBranchService.updateBranch(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.branch_master_id != 0 && req.body.active_flag == 'D') {
                const data = await regionBranchService.deleteBranch(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else {
                return utils.sendResponse(res, null, false);
            }
        } catch (error) {
            return utils.sendResponse(res, null, false, error.message);
        }
    }

    getBranchDetails = async (req, res) => {
        try {
            const data = await regionBranchService.getBranchDetails(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false, error.message);
        }
    };

}