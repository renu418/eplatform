import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {Router,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthguardService {
  constructor(private _authService: AuthService,
  private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      return true;
      
    }
    
    // navigate to login page
    this._router.navigate(["/home"]);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
