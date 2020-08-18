import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { INPUTS } from './user-form.constants';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  /**
   * * This is the form we're gonna use
   */
  public userForm: FormGroup;

  public formInputs = INPUTS;

  /**
   *
   * @param fb This is a Form Builder.
   */
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    /**
     * The Form Builder is used here to create the reactive form.
     */
    this.userForm = this.fb.group(
      {
        /**
         * The key is the name of the Control and the
         * param is an array with the following attributes:
         * the first item is the initial value of the form input,
         * the second item is the validation for the form input
         */
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: '',
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        password: ['', Validators.required],
        repeatPassword: ['', [Validators.required]],
      },
      /**
       * This validator checks wether both passwords match or not.
       * It is purposedly added outside of the first scope so the
       * function for validations receive de whole form as a parameter
       */
      { validators: this.checkPassword }
    );

    // setTimeout(() => this.getAllErrors(), 1000);
  }

  /**
   *
   * @param form is the whole Form Group this function either returns null or an object with an error
   */
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

  public getAllErrors() {
    return Object.keys(this.userForm.controls).map(
      (controlName: string) => this.userForm.get(controlName).errors

      // {
      //   return {
      //     name: controlName,
      //     error: this.userForm.get(controlName).errors,
      //   };
      // }
    );
  }
}
