import jwt from 'jsonwebtoken';
import utils from './utils.js';
import connection from './mysql.controller.js';

const validateToken = async (req, res, next) => {
    let token =
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"] ||
        req.headers["authorization"];

    if (!token) {
        utils.sendResponse(res, null, false, 'User is not otherized');
        return;
    }

    const tokenArr = token.split(" ");
    token = tokenArr.length == 2 ? tokenArr[1] : tokenArr[0];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        let userAuth = await checkUserAuthorization(req.user.user_master_id);
        if (userAuth) { next(); }
        else { return utils.sendResponse(res, null, false, 'Invalid User'); }
    } catch (error) {
        return utils.sendResponse(res, null, false, 'Invalid token');
    }
}

const checkUserAuthorization = async (user_master_id) => {
    let uAuth = await connection.query("select * from user_master where job_status = 'W' and active_flag = 'A' and user_master_id = %user_master_id% ;"
        .replace('%user_master_id%', user_master_id))
    if (uAuth.response.length) return true;
    else return false;
}

export default validateToken;