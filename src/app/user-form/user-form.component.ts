import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: '',
        email: ['', Validators.required],
        password: ['', Validators.required],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: this.checkPassword }
    );
  }

  public formInputs: {
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

  public checkPassword(form: AbstractControl): null | { mismatch: boolean } {
    const repeatPassword: AbstractControl = form.get('repeatPassword');
    if (repeatPassword.value !== form.get('password').value) {
      const error = { mismatch: true };
      repeatPassword.markAsTouched();
      repeatPassword.setErrors(error);
      return error;
    }
    repeatPassword.setErrors(null);
    return null;
  }
}
