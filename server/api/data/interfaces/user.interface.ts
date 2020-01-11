import mongoose = require('mongoose');

export type comparePasswordFunction = (
  candidatePassword: string
) => Promise<boolean>;

export interface Address {
  address1: string;
  address2: string;
  address3: string;
  state: string;
  country: string;
}

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  email: string;
  password?: string;
  role: number;

  firstName: string;
  lastName: string;
  address: Address;

  isActive: boolean;
  isEmailVerified: boolean;
  createdBy?: mongoose.Schema.Types.ObjectId;

  // others
  comparePassword: comparePasswordFunction;
}

export interface UserModel extends User, mongoose.Document {
  _id: { type: mongoose.Schema.Types.ObjectId; required: true };
}
