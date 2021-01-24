import Joi from 'joi';

export const SearchParamsSchema = Joi.object().keys({
  limit: Joi.number().default(10),
  from: Joi.number().default(1),
  query: Joi.string().required(),
});
