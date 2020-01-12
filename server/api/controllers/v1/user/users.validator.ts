import Joi from '@hapi/joi';
import { Roles } from './../../../data/enums/roles.enum';

const userIdParam = Joi.object({
  id: Joi.string().required()
});

export { userIdParam };
