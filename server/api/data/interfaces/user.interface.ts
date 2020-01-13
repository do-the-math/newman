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

export interface UserDocument extends mongoose.Document {
  email: string;
  password?: string;
  role: number;

  firstName?: string;
  lastName?: string;
  address?: Address;

  isActive: boolean;
  isEmailVerified: boolean;

  comparePassword: comparePasswordFunction;
}
