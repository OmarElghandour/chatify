const Joi = require("joi");

const UserSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().email(),
    password : Joi.string().required()
});

module.exports = UserSchema;
