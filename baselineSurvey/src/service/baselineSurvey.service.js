import baselineSurveyQuery from '../query/baselineSurvey.query.js';
import connection from '../../../common_services/connection.js';
import utils from '../../../common_services/utils.js';

export default new class BaselineSurveyservice {

    getBaselineSurveyList = async (req) => {
        try {
            const queryString = baselineSurveyQuery.GET_BASELINE_SURVEY_LIST_BY_VILLAGE_ID
                .replace('%village_master_id%', req.village_master_id)
                .replace('%branch_master_id%', req.branch_master_id);
            const data = await connection.query(queryString);
            utils.convertArrayDateField(data.response, 'created_on');
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };
}