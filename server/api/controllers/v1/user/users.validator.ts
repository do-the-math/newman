import { Joi, Segments } from 'celebrate';

const idParamReqSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
};

const userCreateReqSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    role: Joi.number().integer(),
    password: Joi.string().min(4)
  })
};

export { idParamReqSchema, userCreateReqSchema };
