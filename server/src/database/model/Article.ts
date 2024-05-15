import { model, Schema, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Article';
export const COLLECTION_NAME = 'articles';

export default interface Article {
  _id: Types.ObjectId;
  title: string;
  author: Types.ObjectId;
  content?: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Article>(
  {
    title: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 20,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: Schema.Types.Number,
    },
    content: {
      type: Schema.Types.String,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const ArticleModel = model<Article>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME,
);
