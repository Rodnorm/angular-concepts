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
