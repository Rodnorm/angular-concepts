import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  /**
   * We set the observable to match in case the viewport
   * becomes smaller than 900px
   */
  public layoutChanges = this.breakpointObserver.observe(['(max-width:900px)']);

  /**
   * This returns an observable that will be triggered
   * everytime there's a change on the view width
   */
  public changeLayout(): Observable<BreakpointState> {
    return this.layoutChanges;
  }
}
