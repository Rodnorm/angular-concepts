import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  /**
   * Event Emitter Handler
   * @param form FormGroup is the data that the child component sent
   */
  public formHandlerParent(form: FormGroup) {
    console.log(form);
  }
}
