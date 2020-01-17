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

export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  role: number;

  firstName?: string;
  lastName?: string;
  address?: Address;

  isActive: boolean;
  isEmailVerified: boolean;
}
