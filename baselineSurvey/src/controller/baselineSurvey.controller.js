import baselineSurveyService from '../service/baselineSurvey.service.js';
import utils from '../../../common_services/utils.js';

export default new class BaselineSurveycontroller {

    getPrerequisite = async (req, res) => {
        try {
            const data = await baselineSurveyService.getPrerequisite(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getEducatorByUserId = async (req, res) => {
        try {
            const data = await baselineSurveyService.getEducatorByUserId(req.user);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getBaselineSurveyList = async (req, res) => {
        try {
            const data = await baselineSurveyService.getBaselineSurveyList(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    checkBaselineSurveyStatus = async (req, res) => {
        try {
            const data = await baselineSurveyService.checkBaselineSurveyStatus(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    saveOrUpdateOrDeleteBaselineSurvey = async (req, res) => {
        try {
            if (req.body.participants_baseline_survey_id == 0 && req.body.active_flag == 'A') {
                const data = await baselineSurveyService.saveBaselineSurvey(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.participants_baseline_survey_id != 0 && req.body.active_flag == 'A') {
                const data = await baselineSurveyService.updateBaselineSurvey(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else if (req.body.participants_baseline_survey_id != 0 && req.body.active_flag == 'D') {
                const data = await baselineSurveyService.deleteBaselineSurvey(req.body, req.user);
                return utils.sendResponse(res, data, true);
            } else {
                return utils.sendResponse(res, null, false);
            }
        } catch (error) {
            return utils.sendResponse(res, null, false, error.message);
        }
    }


    getBaselineSurveyReport = async (req, res) => {
        try {
            const data = await baselineSurveyService.getBaselineSurveyReport(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getBaselineSurveyReportByRegion = async (req, res) => {
        try {
            const data = await baselineSurveyService.getBaselineSurveyReportByRegion(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };
}