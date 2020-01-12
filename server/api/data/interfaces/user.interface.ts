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

export type UserDocument = mongoose.Document & {
  email: string;
  password?: string;
  role: number;

  firstName?: string;
  lastName?: string;
  address?: IAddress;

  isActive: boolean;
  isEmailVerified: boolean;

  comparePassword: comparePasswordFunction;
};
