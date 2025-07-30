import userQuery from '../query/user.query.js';
import connection from '../../../common_services/mysql.controller.js';
import utils from '../../../common_services/utils.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

    getMenuList = async (req) => {
        try {
            const queryString = req.user.login_id ? userQuery.GET_SUB_MENU_LIST.replace('%login_id%', req.user.login_id)
                : userQuery.GET_SUB_MENU_LIST_FOR_EDUCATOR;
            const data = await connection.query(queryString);
            return this.arrayObject(data.response);
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    arrayObject = async (originalData) => {

        const transformedData = [];

        // Iterate over originalData
        originalData.forEach((obj) => {
            // Check if the main menu exists in transformedData
            const mainMenu = transformedData.find(menu => menu.main_menu_master_id === obj.main_menu_master_id);

            if (mainMenu) {
                // Check if the sub-menu exists in the main menu
                const subMenu = mainMenu.sub_menu_details.find(subMenu => subMenu.sub_menu_name === obj.sub_menu_name);

                if (subMenu) {
                    // Sub-menu exists, push access type to access_type_details array
                    subMenu.access_type_details.push(obj.access_type);
                } else {
                    // Sub-menu does not exist, create a new sub-menu
                    mainMenu.sub_menu_details.push({
                        sub_menu_name: obj.sub_menu_name,
                        sub_menu_path: '/' + obj.sub_menu_name.toLowerCase().replace(/ /g, '_'),
                        access_type_details: [obj.access_type]
                    });
                }
            } else {
                // Main menu does not exist, create a new main menu with a sub-menu
                transformedData.push({
                    main_menu_master_id: obj.main_menu_master_id,
                    main_menu_name: obj.main_menu_name,
                    myclass: false,
                    sub_menu_details: [{
                        sub_menu_name: obj.sub_menu_name,
                        sub_menu_path: '/' + obj.sub_menu_name.toLowerCase().replace(/ /g, '_'),
                        access_type_details: [obj.access_type]
                    }]
                });
            }
        });
        return transformedData;
    }


    login = async (req) => {
        try {
            const queryString = userQuery.GET_USER.replace('%login_id%', req.login_id);

            const data = await connection.query(queryString);

            const passwordMatch = await this.matchPassword(req.password, data.response[0].password);

            if (passwordMatch) {
                const user = {
                    user_master_id: data.response[0].user_master_id,
                    user_name: data.response[0].user_name,
                    login_id: data.response[0].login_id,
                    branch_master_id: data.response[0].branch_master_id,
                    designation_code: data.response[0].designation_code,
                    user_role_master_id: data.response[0].user_role_master_id,
                    role_code: data.response[0].role_code,
                    role_description: data.response[0].role_description
                };
                const payload = {
                    user_master_id: data.response[0].user_master_id,
                    user_name: data.response[0].user_name,
                    login_id: data.response[0].login_id,
                    password: data.response[0].password,
                    salt: data.response[0].salt,
                    user_role_master_id: data.response[0].user_role_master_id,
                };
                // user.access_token = jwt.sign(payload, process.env.SECRET_KEY);
                user.access_token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
                return user;
            } else {
                throw new Error('Password mismatch');
            }
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    matchPassword = async (enteredPassword, savedPassword) => {
        try {
            return await bcrypt.compare(enteredPassword, savedPassword);
        } catch (error) {
            return false;
        }
    };

    reset = async (req) => {
        try {
            const hashsalt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.newPassword, hashsalt);

            const queryString = userQuery.CHANGE_PASSWOARD
                .replace('%password%', hashedPassword)
                .replace('%salt%', hashsalt)
                .replace('%login_id%', req.login_id);

            const data = await connection.query(queryString);
            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Update User Password');
            }
            return 'User Password Successfully Updated';

        } catch (error) {
            throw new Error('Failed to Update User Password');
        }
    };



    userPrerequisite = async (req) => {
        try {
            const data = await connection.query(userQuery.GET_USER_PREREQUISITE_1);
            const data1 = await connection.query(userQuery.GET_USER_PREREQUISITE_2);
            return ({ roleList: data1.response, designationList: data.response });
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

}