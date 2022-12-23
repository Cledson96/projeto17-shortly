import joi from "joi";

export const signin_Schema = joi.object({
    password: joi.string().required().min(6),
    email: joi.string().min(3).required().email()
});
