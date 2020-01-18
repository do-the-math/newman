import bcrypt from 'bcryptjs';
import mongoose, { Schema, Document } from 'mongoose';
import { Roles } from '../enums/roles.enum';
import { IUser } from '../interfaces/user.interface';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    password: {
      type: String,
      minlength: [6, 'Password need to be longer!'],
      trim: true
    },
    role: {
      type: Number,
      enum: [Roles.CLIENT, Roles.ADMIN],
      default: Roles.CLIENT,
      required: true
    },

    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: {
      address1: String,
      address2: String,
      address3: String,
      state: String,
      country: String
    },

    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// will not be included when models are converted to Object(toObject())
UserSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName}  ${this.profile.lasName}`;
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Compare Password - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  comparePassword: (candidatePassword: string): Promise<boolean> => {
    return bcrypt.compare(candidatePassword, this.password);
  }
};

/**
 * Statics
 */

UserSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */
  load: function(options, cb) {
    options.select = options.select || 'name username';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

const UserModel = mongoose.model<IUser & Document>('User', UserSchema);

export default UserModel;
