export const INPUTS: {
  name: string;
  formControlName: string;
  errorMessage?: string;
}[] = [
  {
    name: 'First Name',
    formControlName: 'firstName',
  },
  {
    name: 'Last Name',
    formControlName: 'lastName',
  },
  {
    name: 'Address',
    formControlName: 'address',
  },
  {
    name: 'Email',
    formControlName: 'email',
    errorMessage: 'Please use a valid email',
  },
  {
    name: 'Password',
    formControlName: 'password',
  },
  {
    name: 'Repeat Password',
    formControlName: 'repeatPassword',
    errorMessage: "The passwords don't match",
  },
];

export enum GridValueForDevice {
  'DESKTOP' = '0.8:1',
  'DESKTOP_COLUMN' = '3',
  'MOBILE' = '1:1.2',
  'MOBILE_COLUMN' = '1',
}

export interface UserFormLayout {
  height: string;
  column: string;
}
