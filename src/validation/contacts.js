import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string', 
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(3).max(20),
  contactType: Joi.string().min(3).max(20),
  isFavourite: Joi.number(),
  email: Joi.string().min(3).max(20),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  contactType: Joi.string().min(3).max(20),
  isFavourite: Joi.number(),
  email: Joi.string().min(3).max(20),
});