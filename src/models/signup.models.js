import joi from "joi";

export const signup_Schema = joi.object({
    username: joi.string().required().min(2).max(50),
    password: joi.string().required().min(6),
    confirmPassword: joi.string().required().min(6),
    email: joi.string().min(3).required().email(),
});
