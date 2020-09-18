import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormArray,
  ValidationErrors,
} from '@angular/forms';
import { BreakpointState } from '@angular/cdk/layout';

import {
  INPUTS,
  GridValueForDevice,
  UserFormLayout,
} from './user-form.constants';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  /**
   * This is the Event Emmiter. It sends data to the parent level of the component.
   * In this case we're stating that we'll pass an object of the type FormGroup.
   */
  @Output() formHandler: EventEmitter<FormGroup> = new EventEmitter();

  /**
   *
   * @param fb This is a Form Builder.
   */
  constructor(private fb: FormBuilder, private sharedService: SharedService) {}
  /**
   * * This is the form we're gonna use
   */
  public userForm: FormGroup;

  public formInputs = INPUTS;

  public gridValue: UserFormLayout;

  ngOnInit(): void {
    this.initializeForm();
    this.handleLayout();
  }

  public initializeForm(): void {
    /**
     * The Form Builder is used here to create the reactive form.
     */
    this.userForm = new FormGroup({
      /**
       * A Form Array is a list of indepents Form Groups
       */
      items: new FormArray([]),
    });

    this.addItem();
  }

  /**
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

  public getErrors(index: number): ValidationErrors {
    return (this.userForm.get('items') as FormArray).controls[index].errors;
  }

  public addItem(): void {
    (this.userForm.get('items') as FormArray).push(
      this.fb.group(
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
      )
    );
  }

  /**
   * This function subscribes to a service that is watching
   * for width changing within the application
   * If the width changes to less than 900px a mobile view port is added
   */
  public handleLayout(): void {
    this.sharedService.changeLayout().subscribe(
      (result: BreakpointState) =>
        (this.gridValue = result.matches
          ? {
              height: GridValueForDevice.MOBILE,
              column: GridValueForDevice.MOBILE_COLUMN,
            }
          : {
              height: GridValueForDevice.DESKTOP,
              column: GridValueForDevice.DESKTOP_COLUMN,
            })
    );
  }
  /**
   * Function that prepare the data for the emission using .emit($yourData)
   */
  public sendForm() {
    this.formHandler.emit(this.userForm);
  }
}
