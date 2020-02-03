import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {NavService} from 'src/app/services/nav.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  constructor(private spinner:NgxSpinnerService,
    private router: Router,
    private authservice: AuthService,
    private navservice :NavService,
    private cookieService: CookieService) {
    // localStorage.setItem("activate","false") 
      
      //  this.authservice.clear();
       
  }

  ngOnInit() {
  //  this.submit();
  this.authservice.clear();
  this.cookieService.set("activate","false") 
  }
 ngAfterViewInit(){
  

 }
  // submit() {
  //   this.spinner.show();
  //   setTimeout(() => {
  //       this.spinner.hide();
  //       this.router.navigate(['/register']);
  //     }, 3000);
  // }
  
goToLogin(){
  this.router.navigate(['/home'])
}
}