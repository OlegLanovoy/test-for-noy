import { Schema, model } from 'mongoose';


interface IPost {
  title: string;
  text: string;
  isPublished: boolean;
  user: Schema.Types.ObjectId;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PostModel = model<IPost>('Post', PostSchema);

export default PostModel