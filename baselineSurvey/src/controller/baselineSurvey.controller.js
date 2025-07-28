import baselineSurveyService from '../service/baselineSurvey.service.js';
import utils from '../../../common_services/utils.js';

export default new class BaselineSurveycontroller {


    getBaselineSurveyList = async (req, res) => {
        try {
            const data = await baselineSurveyService.getBaselineSurveyList(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };



}