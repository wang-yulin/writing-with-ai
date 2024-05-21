import { model, Schema, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Comment';
export const COLLECTION_NAME = 'comments';

export default interface Comment {
  _id?: Types.ObjectId;
  article?: Types.ObjectId;
  content: string;
  createdAt?: Date;
}

const schema = new Schema<Comment>(
  {
    content: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 1000,
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const CommentModel = model<Comment>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME,
);
