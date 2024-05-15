import Joi from 'joi';
import { JoiAuthBearer } from '../../helpers/validator';

export default {
  credential: Joi.object().keys({
    username: Joi.string().required().min(3),
    password: Joi.string().required().min(6),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    username: Joi.string().required().min(3),
    confirm: Joi.string().required().min(6),
    password: Joi.string().required().min(6),
    // profilePicUrl: Joi.string().optional().uri(),
  }),
};
