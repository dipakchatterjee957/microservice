import utils from './utils'; 

// module.exports = (schema, validateParams) =>{
//     utils.catchAsync(async (req,res,next) => {
//         if(validateParams){
//             await schema.validate({
//                 params: req.params,
//                 abortEarly: false,
//             })
//         }else{
//             await schema.validate({
//                 body: req.body,
//                 abortEarly: false
//             })
//         }
//         return next();
//     })
// }

module.exports = (schema, validateParams) => {
    return utils.catchAsync(async (req, res, next) => {
        try {
            if (validateParams) {
                await schema.validate({
                    params: req.params,
                    abortEarly: false,
                });
            } else {
                await schema.validate({
                    body: req.body,
                    abortEarly: false,
                });
            }
            return next();
        } catch (error) {
            // Handle validation errors
            console.error('validation errors=>',error.errors[0]);
            return utils.sendResponse(res, null, false, error.errors[0]);
        }
    });
};