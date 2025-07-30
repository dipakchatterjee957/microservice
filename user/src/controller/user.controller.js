import userService from '../service/user.service.js';
import utils from '../../../common_services/utils.js';

export default new class Usercontroller {

    getUserList = async (req, res) => {
        try {
            const data = await userService.getUserList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    getMenuList = async (req, res) => {
        try {
            const data = await userService.getMenuList(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };

    login = async (req, res) => {
        console.log('Login request micro');
        try {
            const data = await userService.login(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false, error.message);
        }
    };

    reset = async (req, res) => {
        try {
            const data = await userService.reset(req.body);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false, error.message);
        }
    };

    userPrerequisite = async (req, res) => {
        try {
            const data = await userService.userPrerequisite(req);
            return utils.sendResponse(res, data, true);
        } catch (error) {
            console.error(error);
            return utils.sendResponse(res, null, false);
        }
    };
}