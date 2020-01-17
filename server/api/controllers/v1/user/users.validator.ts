import { Roles } from './../../../data/enums/roles.enum';
import { Joi, Segments } from 'celebrate';

const idParamSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
};

const userCreateSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .label('a Name')
      .required()
      .error(new Error('email is required field!')),
    role: Joi.number().integer(),

    password: Joi.string().min(4)
  })
};

export { idParamSchema, userCreateSchema };
