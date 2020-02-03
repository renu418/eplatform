import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new Subject<boolean>();
  // private timeout = 60*1000;
  private timeout:number;
  constructor(private router: Router,
  private cookieService: CookieService) { 
    if (localStorage.getItem('token') != null) {
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }


  clear(): void {
    console.log('i am called')
    localStorage.clear();
  }
  setTime()
  {

    this.timeout=2*60*1000;
    this.setTimer()
  }
  isAuthenticated(): boolean {
    // return localStorage.getItem('token') != null && !this.isTokenExpired();
    if(localStorage.getItem('token') != null)
    {
      // if( !this.isTokenExpired())
      // {
        return true
      // }
    }
    return false
  }
 
  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }

  loginStatus(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  logout(): void {
    
    console.log("###########in logout##########")
    this.isLoggedIn.next(false)
    this.router.navigate(['/thankyou']);
    // this.clear();
  }

  setTimer() {
    const str = new Date().toISOString();
    console.log("#####time str########",str)
    // localStorage.setItem('lastAction', str);
    setTimeout(() => {
      this.logout();
    }, this.timeout);
  }

  resetTimer() {
    localStorage.setItem('lastAction', new Date().toISOString());
  }
}
