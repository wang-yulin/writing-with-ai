import { Types } from 'mongoose';
import Article, { ArticleModel } from '../model/Article';

async function findById(id: Types.ObjectId): Promise<Article | null> {
  return ArticleModel.findOne({ _id: id })
    .select('+title +_id +content +createdAt +updatedAt')
    .lean()
    .exec();
}

async function update(article: Article) {
  article.updatedAt = new Date();
  return ArticleModel.findByIdAndUpdate(article._id, article, { new: true })
    .lean()
    .exec();
}

async function create(
  article: Article,
  userId: Types.ObjectId,
): Promise<{ article: Article }> {
  const now = new Date();
  article.createdAt = article.updatedAt = now;
  article.author = userId;
  const createdArticle = await ArticleModel.create(article);

  return {
    article: createdArticle,
  };
}

export default {
  create,
  findById,
  update,
};
