import jwt from 'jsonwebtoken';
const utils = require('./utils');
const userQuery = require('../query/user.query');
const connection = require('./mysql.controller');

module.exports.validateToken = async (req, res, next) => {
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
        let userAuth;
        if (req.user.user_master_id) {
            userAuth = await checkUserAuthorization(req.user.user_master_id);
        } else {
            userAuth = await checkEducatorAuthorization(req.user.educator_master_id);
        }
        if (userAuth) { next(); }
        else { return utils.sendResponse(res, null, false, 'Invalid User'); }
    } catch (error) {
        return utils.sendResponse(res, null, false, 'Invalid token');
    }
}

const checkUserAuthorization = async (user_master_id) => {
    let uAuth = await connection.query(userQuery.CHECK_USER_AUTHENTICATION_QUERY
        .replace('%user_master_id%', user_master_id))
    if (uAuth.response.length) return true;
    else return false;
}

const checkEducatorAuthorization = async (educator_master_id) => {
    let uAuth = await connection.query(userQuery.CHECK_EDUCATOR_AUTHENTICATION_QUERY
        .replace('%educator_master_id%', educator_master_id))
    if (uAuth.response.length) return true;
    else return false;
}