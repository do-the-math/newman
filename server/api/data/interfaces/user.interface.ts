/* eslint-disable @typescript-eslint/interface-name-prefix */
import mongoose = require('mongoose');

export type comparePasswordFunction = (
  candidatePassword: string
) => Promise<boolean>;

export interface IAddress {
  address1: string;
  address2: string;
  address3: string;
  state: string;
  country: string;
}

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;
  email: string;
  password?: string;
  role: number;

  firstName: string;
  lastName: string;
  address: IAddress;

  isActive: boolean;
  isEmailVerified: boolean;
  createdBy?: mongoose.Schema.Types.ObjectId;

  // others
  comparePassword: comparePasswordFunction;
}

export interface IUserModel extends IUser, mongoose.Document {
  _id: { type: mongoose.Schema.Types.ObjectId; required: true };
}
