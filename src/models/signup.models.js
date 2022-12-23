import joi from "joi";

export const signup_Schema = joi.object({
    username: joi.string().required().min(2).max(50),
    password: joi.string().required().min(8),
    email: joi.string().min(3).required().email(),
});
