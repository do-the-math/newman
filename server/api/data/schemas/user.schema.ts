/* eslint-disable @typescript-eslint/camelcase */
import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import { IUserModel } from '../interfaces/user.interface';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },

    password: {
      type: String,
      minlength: 4
    },
    role: {
      type: Number,
      default: 1,
      required: true
    },

    first_name: String,
    last_name: String,
    address: {
      address1: String,
      address2: String,
      address3: String,
      state: String,
      country: String
    },

    // User or Admin can deactivate the user
    is_active: { type: Boolean, default: true },

    // Verified when user's email is verified
    is_email_verified: { type: Boolean, default: false },

    // who created this user
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// will not be included when models are converted to Object(toObject())
UserSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName}  ${this.profile.lasName}`;
});

// password compare function
function comparePassword(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
}

UserSchema.methods.comparePassword = comparePassword;

export default mongoose.model<IUserModel>('User', UserSchema);
