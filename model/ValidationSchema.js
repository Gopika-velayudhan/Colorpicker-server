import Joi from "joi";



export const joiTestSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string().regex(/^#[0-9A-F]{6}$/i).required()
});
1