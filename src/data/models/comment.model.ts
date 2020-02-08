import bcrypt from 'bcryptjs';
import mongoose, { Schema, Document } from 'mongoose';
import Roles from '../enums/roles.enum';
import { User } from '../interfaces/user.interface';

const CommentSchema = new Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    message: String
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<User & Document>(
  'Comments',
  CommentSchema
);

export default CommentModel;
