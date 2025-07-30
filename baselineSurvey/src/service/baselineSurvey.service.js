import baselineSurveyQuery from '../query/baselineSurvey.query.js';
import connection from '../../../common_services/mysql.controller.js';
import utils from '../../../common_services/utils.js';

export default new class BaselineSurveyservice {

    getPrerequisite = async (req) => {
        try {
            const queryString = baselineSurveyQuery.GET_PREREQUISITE_BY_CATAGORY_SELECTION_ID.replace('%category_section_id%', req.category_section_id);
            const data = await connection.query(queryString);
            const transformedData = Object.values(data.response.reduce((acc, item) => {
                const { category_section_id, category_section_name, main_category_id, main_category_name, ...subCategoryData } = item;
                acc[main_category_id] = acc[main_category_id] || { category_section_id, category_section_name, main_category_id, main_category_name, sub_category_list: [] };
                if (subCategoryData.sub_category_id) { acc[main_category_id].sub_category_list.push(subCategoryData) };
                return acc;
            }, {}));
            return transformedData;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getEducatorByUserId = async (user) => {
        try {
            const queryString = baselineSurveyQuery.GET_EDUCATOR_BY_USER_ID.replace('%user_master_id%', user.user_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

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

    checkBaselineSurveyStatus = async (req) => {
        try {
            const queryString = baselineSurveyQuery.CHECK_BASELINE_SURVEY_STATUS.replace('%branch_master_id%', req.branch_master_id);
            const data = await connection.query(queryString);
            return data.response.length ? true : false;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    saveBaselineSurvey = async (req, user) => {
        try {
            let queryString = baselineSurveyQuery.BEFORE_CREATE_FIND_BRANCH_VILLAGE_MAP_ID
                .replace('%village_master_id%', req.village_master_id);
            const branch_village_map_id = await connection.query(queryString);
            if (branch_village_map_id.response[0].branch_village_map_id) {
                let queryString = baselineSurveyQuery.CREATE_BASELINE_SURVEY
                    .replace('%branch_village_map_id%', branch_village_map_id.response[0].branch_village_map_id)
                    .replace('%educator_master_id%', req.educator_master_id)
                    .replace('%participants_name%', req.participants_name)
                    .replace('%husband_or_guardian_name%', req.husband_or_guardian_name)
                    .replace('%mobile_number%', req.mobile_number ? "'" + req.mobile_number + "'" : null)
                    .replace('%participants_age%', req.participants_age)
                    .replace('%educational_qualification%', req.educational_qualification)
                    .replace('%occupation%', req.occupation)
                    .replace('%married%', req.married)
                    .replace('%family_monthly_income%', req.family_monthly_income)
                    .replace('%religion%', req.religion)
                    .replace('%caste%', req.caste)
                    .replace('%bank_or_po_account%', req.bank_or_po_account)
                    .replace('%deposited_money_bank_or_po_last_3_month%', req.deposited_money_bank_or_po_last_3_month)
                    .replace('%atm_or_debit_card_withdraw_money%', req.atm_or_debit_card_withdraw_money)
                    .replace('%type_of_investment_account%', req.type_of_investment_account)
                    .replace('%life_insurance%', req.life_insurance)
                    .replace('%health_insurance%', req.health_insurance)
                    .replace('%money_spend_as_family_budget%', req.money_spend_as_family_budget)
                    .replace('%loans%', req.loans)
                    .replace('%purpose_of_loan%', req.purpose_of_loan ? "'" + req.purpose_of_loan + "'" : null)
                    .replace('%use_digital_transaction_application%', req.use_digital_transaction_application)
                    .replace('%type_of_digital_transaction%', req.type_of_digital_transaction ? "'" + req.type_of_digital_transaction + "'" : null)
                    .replace('%government_financial_allowance%', req.government_financial_allowance)
                    .replace('%created_by%', user.user_master_id);

                const data = await connection.query(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Create Baseline Survey');
                }
                return 'Baseline Survey Successfully Created';
            } else {
                throw new Error('Failed to Create Baseline Survey');
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    updateBaselineSurvey = async (req, user) => {
        try {
            let queryString = baselineSurveyQuery.UPDATE_BASELINE_SURVEY
                .replace('%educator_master_id%', req.educator_master_id)
                .replace('%participants_name%', req.participants_name)
                .replace('%husband_or_guardian_name%', req.husband_or_guardian_name)
                .replace('%mobile_number%', req.mobile_number ? "'" + req.mobile_number + "'" : null)
                .replace('%participants_age%', req.participants_age)
                .replace('%educational_qualification%', req.educational_qualification)
                .replace('%occupation%', req.occupation)
                .replace('%married%', req.married)
                .replace('%family_monthly_income%', req.family_monthly_income)
                .replace('%religion%', req.religion)
                .replace('%caste%', req.caste)
                .replace('%bank_or_po_account%', req.bank_or_po_account)
                .replace('%deposited_money_bank_or_po_last_3_month%', req.deposited_money_bank_or_po_last_3_month)
                .replace('%atm_or_debit_card_withdraw_money%', req.atm_or_debit_card_withdraw_money)
                .replace('%type_of_investment_account%', req.type_of_investment_account)
                .replace('%life_insurance%', req.life_insurance)
                .replace('%health_insurance%', req.health_insurance)
                .replace('%money_spend_as_family_budget%', req.money_spend_as_family_budget)
                .replace('%loans%', req.loans)
                .replace('%purpose_of_loan%', req.purpose_of_loan ? "'" + req.purpose_of_loan + "'" : null)
                .replace('%use_digital_transaction_application%', req.use_digital_transaction_application)
                .replace('%type_of_digital_transaction%', req.type_of_digital_transaction ? "'" + req.type_of_digital_transaction + "'" : null)
                .replace('%government_financial_allowance%', req.government_financial_allowance)
                .replace('%updated_by%', user.user_master_id)
                .replace('%updated_on%', utils.getCurrentDateTime())
                .replace('%participants_baseline_survey_id%', req.participants_baseline_survey_id);

            const data = await connection.query(queryString);
            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Update Baseline Survey');
            }
            return 'Baseline Survey Successfully Updated';

        } catch (error) {
            throw error;
        }
    }

    deleteBaselineSurvey = async (req, user) => {
        try {
            let queryString = baselineSurveyQuery.DELETE_BASELINE_SURVEY
                .replace('%deleted_by%', user.user_master_id)
                .replace('%deleted_on%', utils.getCurrentDateTime())
                .replace('%participants_baseline_survey_id%', req.participants_baseline_survey_id);

            const data = await connection.query(queryString);
            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Delete Baseline Survey');
            }
            return 'Baseline Survey Successfully Deleted';
        } catch (error) {
            console.log(error)
            throw error;
        }
    }


    getBaselineSurveyReport = async (req) => {
        try {
            const queryString = baselineSurveyQuery.GET_BASELINE_SURVEY_REPORT_BY_BRANCH_ID
                .replace('%branch_master_id%', req.branch_master_id);
            const data = await connection.query(queryString);
            utils.convertArrayDateField(data.response, 'created_on');

            const formattedData = data.response.map(item => {
                const newItem = { ...item }; // Create a copy to avoid modifying the original

                newItem.type_of_investment_accounts = newItem.type_of_investment_accounts
                    ?.split(',')
                    .map((account, index) => `${index + 1}. ${account.trim()}`)
                    .join(', ');

                newItem.life_insurances = newItem.life_insurances
                    ?.split(',')
                    .map((insurance, index) => `${index + 1}. ${insurance.trim()}`)
                    .join(', ');

                newItem.loans = newItem.loans
                    ?.split(',')
                    .map((item, index) => `${index + 1}. ${item.trim()}`)
                    .join(', ');

                newItem.purpose_of_loan = newItem.purpose_of_loan
                    ?.split(',')
                    ?.map((item, index) => `${index + 1}. ${item.trim()}`)
                    .join(', ');

                newItem.use_digital_transaction_application = newItem.use_digital_transaction_application
                    ?.split(',')
                    .map((item, index) => `${index + 1}. ${item.trim()}`)
                    .join(', ');

                newItem.type_of_digital_transaction = newItem.type_of_digital_transaction
                    ?.split(',')
                    .map((item, index) => `${index + 1}. ${item.trim()}`)
                    .join(', ');

                return newItem;
            });
            return formattedData;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getBaselineSurveyReportByRegion = async (req) => {
        try {
            const queryString = baselineSurveyQuery.GET_BASELINE_SURVEY_REPORT_BY_REGION_ID
                .replace('%region_master_id%', req.region_master_id);
            const data = await connection.query(queryString);
            utils.convertArrayDateField(data.response, 'created_on');

            const formattedData = data.response.map(item => {
                const newItem = { ...item }; // Create a copy to avoid modifying the original

                newItem.type_of_investment_accounts = newItem.type_of_investment_accounts
                    ?.split(',')
                    .map((account, index) => `${index + 1}. ${account.trim()}`)
                    .join(', ');

                newItem.life_insurances = newItem.life_insurances
                    ?.split(',')
                    .map((insurance, index) => `${index + 1}. ${insurance.trim()}`)
                    .join(', ');

                newItem.loans = newItem.loans
                    ?.split(',')
                    .map((item, index) => `${index + 1}. ${item.trim()}`)
                    .join(', ');

                newItem.purpose_of_loan = newItem.purpose_of_loan
                    ?.split(',')
                    ?.map((item, index) => `${index + 1}. ${item.trim()}`)
                    .join(', ');

                newItem.use_digital_transaction_application = newItem.use_digital_transaction_application
                    ?.split(',')
                    .map((item, index) => `${index + 1}. ${item.trim()}`)
                    .join(', ');

                newItem.type_of_digital_transaction = newItem.type_of_digital_transaction
                    ?.split(',')
                    .map((item, index) => `${index + 1}. ${item.trim()}`)
                    .join(', ');

                return newItem;
            });
            return formattedData;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

}