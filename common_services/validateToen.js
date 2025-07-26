import jwt from 'jsonwebtoken';
import utils from './utils';
import userQuery from '../user/src/query/user.query';
import connection from './mysql.controller';

module.exports.validateToken = async(req, res, next) => {
    let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

    if (!token) {
        utils.sendResponse(res, null, false,'User is not otherized');
        return;
    }

    const tokenArr = token.split(" ");
    token = tokenArr.length == 2 ? tokenArr[1] : tokenArr[0];
    
    // jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    //     if (err) {
    //         utils.sendResponse(res, null, false,'Invalid token');
    //       return;
    //     }
    //     req.user = decoded;
    //     next();
    //   });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        let userAuth = await checkUserAuthorization(req.user.user_master_id);
        if(userAuth) { next();}
        else {return utils.sendResponse(res, null, false,'Invalid User');}
    } catch (error) {
        return utils.sendResponse(res, null, false,'Invalid token');
    }
}

const checkUserAuthorization = async (user_master_id) => {
  let uAuth = await connection.query(userQuery.CHECK_USER_AUTHENTICATION_QUERY
      .replace('%user_master_id%', user_master_id))
  if (uAuth.response.length) return true;
  else return false;
}