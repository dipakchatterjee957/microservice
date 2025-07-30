import regionBranchQuery from '../query/regionBranch.query.js';
import connection from '../../../common_services/mysql.controller.js';
import utils from '../../../common_services/utils.js';

export default new class RegionBranchservice {

    saveRegion = async (req, user) => {
        try {
            let queryString = regionBranchQuery.CHECK_REGION_NAME_PRESENT.replace('%region_name%', req.region_name);
            const region_name_present = await connection.query(queryString);
            if (region_name_present.response.length) {
                throw new Error('Duplicate Region Name, Use Different Region Name');
            } else {
                let queryString = regionBranchQuery.CREATE_REGION
                    .replace('%state_master_id%', req.state_master_id)
                    .replace('%region_name%', req.region_name)
                    .replace('%created_by%', user.user_master_id)
                    .replace('%created_on%', utils.getCurrentDateTime());

                const data = await connection.query(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Create Region');
                }
                return 'Region Successfully Created';
            }
        } catch (error) {
            throw error;
        }
    }

    updateRegion = async (req, user) => {
        try {
            let queryString = regionBranchQuery.BEFORE_EDIT_CHECK_REGION_NAME_PRESENT
                .replace('%region_name%', req.region_name)
                .replace('%region_master_id%', req.region_master_id);
            const region_name_present = await connection.query(queryString);
            if (region_name_present.response.length) {
                throw new Error('Duplicate Region Name, Use Different Region Name');
            } else {
                let queryString = regionBranchQuery.UPDATE_REGION
                    .replace('%state_master_id%', req.state_master_id)
                    .replace('%region_name%', req.region_name)
                    .replace('%updated_by%', user.user_master_id)
                    .replace('%updated_on%', utils.getCurrentDateTime())
                    .replace('%region_master_id%', req.region_master_id);

                const data = await connection.query(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Update Region');
                }
                return 'Region Successfully Updated';
            }
        } catch (error) {
            throw error;
        }
    }

    deleteRegion = async (req, user) => {
        try {
            let queryString = regionBranchQuery.DELETE_REGION
                .replace('%deleted_by%', user.user_master_id)
                .replace('%deleted_on%', utils.getCurrentDateTime())
                .replace('%region_master_id%', req.region_master_id);;

            const data = await connection.query(queryString);
            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Delete Region');
            }
            return 'Region Successfully Deleted';

        } catch (error) {
            throw error;
        }
    }

    saveBranch = async (req, user) => {
        try {
            let queryString_1 = regionBranchQuery.CHECK_BRANCH_NAME_PRESENT.replace('%branch_name%', req.branch_name);
            let queryString_2 = regionBranchQuery.CHECK_BRANCH_CODE_PRESENT.replace('%branch_code%', req.branch_code);
            const branch_name_present = await connection.query(queryString_1);
            const branch_code_present = await connection.query(queryString_2);
            if (branch_name_present.response.length || branch_code_present.response.length) {
                throw new Error(`Duplicate Branch ${branch_name_present.response.length ? 'Name' : 'Code'}, 
                Use Different Branch ${branch_name_present.response.length ? 'Name' : 'Code'}`);
            } else {
                let queryString = regionBranchQuery.CREATE_BRANCH
                    .replace('%project_master_id%', req.project_master_id)
                    .replace('%region_master_id%', req.region_master_id)
                    .replace('%block_master_id%', req.block_master_id)
                    .replace('%branch_name%', req.branch_name)
                    .replace('%branch_code%', req.branch_code)
                    .replace('%branch_open_date%', req.branch_open_date)
                    .replace('%address%', req.address)
                    .replace('%village_town%', req.village_town)
                    .replace('%police_station%', req.police_station)
                    .replace('%post_office%', req.post_office)
                    .replace('%landmark%', req.landmark)
                    .replace('%pincode%', req.pincode)
                    .replace('%contact_person_name%', req.contact_person_name)
                    .replace('%contact_person_number%', req.contact_person_number)
                    .replace('%contact_person_email%', req.contact_person_email)
                    .replace('%created_by%', user.user_master_id)
                    .replace('%created_on%', utils.getCurrentDateTime());

                const data = await connection.query(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Create Branch');
                }
                return 'Branch Successfully Created';
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    updateBranch = async (req, user) => {
        try {
            let queryString_1 = regionBranchQuery.BEFORE_EDIT_CHECK_BRANCH_NAME_PRESENT
                .replace('%branch_name%', req.branch_name)
                .replace('%branch_master_id%', req.branch_master_id);
            let queryString_2 = regionBranchQuery.BEFORE_EDIT_CHECK_BRANCH_CODE_PRESENT
                .replace('%branch_code%', req.branch_code)
                .replace('%branch_master_id%', req.branch_master_id);
            const branch_name_present = await connection.query(queryString_1);
            const branch_code_present = await connection.query(queryString_2);
            if (branch_name_present.response.length || branch_code_present.response.length) {
                throw new Error(`Duplicate Branch ${branch_name_present.response.length ? 'Name' : 'Code'}, 
                Use Different Branch ${branch_name_present.response.length ? 'Name' : 'Code'}`);
            } else {
                let queryString = regionBranchQuery.UPDATE_BRANCH
                    .replace('%project_master_id%', req.project_master_id)
                    .replace('%region_master_id%', req.region_master_id)
                    .replace('%block_master_id%', req.block_master_id)
                    .replace('%branch_name%', req.branch_name)
                    .replace('%branch_code%', req.branch_code)
                    .replace('%branch_open_date%', req.branch_open_date)
                    .replace('%address%', req.address)
                    .replace('%village_town%', req.village_town)
                    .replace('%police_station%', req.police_station)
                    .replace('%post_office%', req.post_office)
                    .replace('%landmark%', req.landmark)
                    .replace('%pincode%', req.pincode)
                    .replace('%contact_person_name%', req.contact_person_name)
                    .replace('%contact_person_number%', req.contact_person_number)
                    .replace('%contact_person_email%', req.contact_person_email)
                    .replace('%updated_by%', user.user_master_id)
                    .replace('%updated_on%', utils.getCurrentDateTime())
                    .replace('%branch_master_id%', req.branch_master_id);

                const data = await connection.query(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Update Branch');
                }
                return 'Branch Successfully Updated';
            }
        } catch (error) {
            throw error;
        }
    }

    deleteBranch = async (req, user) => {
        try {
            let queryString = regionBranchQuery.DELETE_BRNCH
                .replace('%deleted_by%', user.user_master_id)
                .replace('%deleted_on%', utils.getCurrentDateTime())
                .replace('%branch_master_id%', req.branch_master_id);;

            const data = await connection.query(queryString);
            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Delete Branch');
            }
            return 'Branch Successfully Deleted';

        } catch (error) {
            throw error;
        }
    }

    getBranchDetails = async (req) => {
        try {
            let queryString = regionBranchQuery.GET_BRANCH_DETAILS
                .replace('%branch_master_id%', req.body.branch_master_id);

            queryString += regionBranchQuery.VILLAGE_EDUCATOR_ROUND_SURVEY_COUNT
                .replace('%branch_master_id%', req.body.branch_master_id);
            const data = await connection.query(queryString);
            // console.log(data.response[0][0], data.response[1][0])
            return ({
                branch_master_id: data.response[0][0].branch_master_id,
                branch_code: data.response[0][0].branch_code,
                state_master_id: data.response[0][0].state_master_id,
                region_master_id: data.response[0][0].region_master_id,
                project_master_id: data.response[0][0].project_master_id,
                district_master_id: data.response[0][0].district_master_id,
                block_master_id: data.response[0][0].block_master_id,
                branch_name: data.response[0][0].branch_name,
                branch_open_date: utils.convertToDate(data.response[0][0].branch_open_date),
                address: data.response[0][0].address,
                village_town: data.response[0][0].village_town,
                police_station: data.response[0][0].police_station,
                post_office: data.response[0][0].post_office,
                landmark: data.response[0][0].landmark,
                pincode: data.response[0][0].pincode,
                contact_person_name: data.response[0][0].contact_person_name,
                contact_person_number: data.response[0][0].contact_person_number,
                contact_person_email: data.response[0][0].contact_person_email,
                active_flag: data.response[0][0].active_flag,
                village_count: data.response[1][0].village_count,
                educator_count: data.response[1][0].educator_count,
                round_count: data.response[1][0].round_count,
                baseline_survey_count: data.response[1][0].baseline_survey_count
            });
        } catch (error) {
            throw error;
        }
    };
}