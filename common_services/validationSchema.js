import yup from 'yup';
const phoneRegex = /^(?:(?:0|91)?[6789]\d{9})$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$?!])[a-zA-Z\d@#$?!]{6,}$/i;

const createUserSchema = yup.object({
    body: yup.object({
        user_name: yup.string().min(3, "Minimum 3 letter required").required(),
        mobile_primary: yup
            .string()
            .matches(phoneRegex, "Phone no is not valid")
            .min(10)
            .max(10),
    })
})

const loginSchema = yup.object({
    body: yup.object({
        login_id: yup.string().required("Please enter login Id"),
        password: yup.string().required("Please enter password"),
    })
})

const resetSchema = yup.object({
    body: yup.object({
        newPassword: yup.string().required("Please enter password"),
        reenterPassword: yup
            .string()
            .matches(passwordRegex, "Password does not meet the criteria")
            .min(6)
            .required("Please enter password"),
    })
})

export default {
    createUserSchema,
    loginSchema,
    resetSchema
}