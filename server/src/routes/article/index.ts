import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import validator, { ValidationSource } from '../../helpers/validator';
import schema from './schema';
import { PublicRequest } from 'app-request';
import ArticleRepo from '../../database/repository/ArticleRepo';
import { getAccessToken } from '../../auth/authUtils';
import JWT from '../../core/JWT';
import { Types } from 'mongoose';
import UserRepo from '../../database/repository/UserRepo';
import { UserModel } from '../../database/model/User';
import { BadRequestError } from '../../core/ApiError';

const router = express.Router();

router.post(
  '/create',
  validator(schema.articleCreate),
  asyncHandler(async (req: PublicRequest, res) => {
    const token = getAccessToken(req.headers.authorization);
    const payload = await JWT.decode(token);

    const { article } = await ArticleRepo.create(
      req.body,
      new Types.ObjectId(payload.sub),
    );

    const user = await UserModel.findById(new Types.ObjectId(payload.sub));
    user?.articles.push(article._id);
    await user?.save();

    new SuccessResponse('创建文章成功！', '').send(res);
  }),
);

router.get(
  '/all',
  asyncHandler(async (req: PublicRequest, res) => {
    const token = getAccessToken(req.headers.authorization);
    const payload = await JWT.decode(token);
    const allArticles = await UserRepo.findAllArticlesForAuthor(
      new Types.ObjectId(payload.sub),
    );
    new SuccessResponse('', allArticles?.articles).send(res);
  }),
);

router.get(
  '/id/:id',
  validator(schema.articleId, ValidationSource.PARAM),
  asyncHandler(async (req: PublicRequest, res) => {
    const article = await ArticleRepo.findById(
      new Types.ObjectId(req.params.id),
    );
    if (!article) throw new BadRequestError('文章不存在！');
    new SuccessResponse('success', article).send(res);
  }),
);

router.post(
  '/update',
  // validator(schema.articleId),
  asyncHandler(async (req, res) => {
    const article = await ArticleRepo.findById(
      new Types.ObjectId(req.body._id),
    );
    if (!article) throw new BadRequestError('文章不存在！');
    const data = await ArticleRepo.update(req.body);
    new SuccessResponse('success', '').send(res);
  }),
);

export default router;
