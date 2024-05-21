import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import validator from '../../helpers/validator';
import schema from './schema';
import { PublicRequest } from 'app-request';
import ArticleRepo from '../../database/repository/ArticleRepo';
import AiModelRepo from '../../database/repository/CommentRepo';
import { BadRequestError } from '../../core/ApiError';
import { OpenAI } from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
});

// 分段处理长文本
const processLongText = async (text: string, maxLength = 2048) => {
  const paragraphs = text.split('\n');
  let combinedText = '';
  let feedbacks = [];

  for (let paragraph of paragraphs) {
    if ((combinedText + paragraph).length <= maxLength) {
      combinedText += paragraph + '\n';
    } else {
      const feedback = await generateFeedback(combinedText);
      feedbacks.push(feedback);
      combinedText = paragraph + '\n';
    }
  }

  if (combinedText) {
    const feedback = await generateFeedback(combinedText);
    feedbacks.push(feedback);
  }

  return feedbacks.join('\n\n');
};

// 调用 OpenAI API 生成反馈
const generateFeedback = async (text: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // 或者 "gpt-3.5-turbo"
    messages: [
      {
        role: 'system',
        content:
          '你是一个优秀的文章评论员，评论的出发点是要激发用户写作的乐趣，鼓励他们继续写下去，评论请控制在500字以内。',
      },
      {
        role: 'user',
        content: `请为以下文章提供反馈意见：\n\n${text}`,
      },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

router.post(
  '/create',
  validator(schema.articleId),
  asyncHandler(async (req: PublicRequest, res) => {
    const article = await ArticleRepo.findById(req.body.id);

    if (!article?.content) {
      throw new BadRequestError('请传入文章内容！');
    }
    const response = await processLongText(article.content);
    const { comment } = await AiModelRepo.create(
      { content: response },
      article._id,
    );
    new SuccessResponse('创建反馈成功！', comment.content).send(res);
  }),
);

export default router;
