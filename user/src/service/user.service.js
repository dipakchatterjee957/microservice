import userQuery from '../query/user.query.js';
import connection from '../../../common_services/mysql.controller.js';

export default new class Userservice {

    getUserList = async (req) => {
        try {
            const queryString = userQuery.GET_USER_LIST
                .replace('%region_master_id%', req.body.region_master_id)
                .replace('%branch_master_id%', req.body.branch_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };
}