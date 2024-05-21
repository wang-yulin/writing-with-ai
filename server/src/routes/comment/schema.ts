import Joi from 'joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../helpers/validator';

export default {
  articleId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
};
