import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  // private isLoggedIn = new Subject<boolean>();
  constructor() {
    // if (localStorage.getItem('token') != null) {
    //   this.isLoggedIn.next(true);
    // } else {
    //   this.isLoggedIn.next(false);
    // }
  }

  // updateLoginStatus(status: boolean) {
  //   this.isLoggedIn.next(status);
  // }

  // loginStatus(): Observable<boolean> {
  //   return this.isLoggedIn.asObservable();
  // }

}
