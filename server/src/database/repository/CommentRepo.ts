import { Types } from 'mongoose';
import Comment, { CommentModel } from '../model/Comment';

async function create(
  comment: Comment,
  articleId: Types.ObjectId,
): Promise<{ comment: Comment }> {
  const now = new Date();
  comment.createdAt = now;
  comment.article = articleId;
  const createdComment = await CommentModel.create(comment);

  return {
    comment: createdComment,
  };
}

export default {
  create,
};
