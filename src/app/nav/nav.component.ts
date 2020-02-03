import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { CountdownModule ,CountdownComponent} from 'ngx-countdown';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from "src/app/services/nav.service";
import { Subscription } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  // subscription: Subscription;
  // public show:boolean = false;
  // private navbarService: NavService

  isLoggedIn = false;
  activate:string='false';
 
  subscription: Subscription;
  constructor(private authservice: AuthService,
    private navbarService: NavService,
    private cookieService: CookieService,
    private router: Router) {
      this.activate=cookieService.get("activate")
      console.log("activate:",this.activate)
      
    
     }
  @ViewChild('countdown',{static:false}) counter: CountdownComponent;
  
  
  ngOnInit() {
    // if(this.activate=='false')
    // {
    //   this.isLoggedIn=false;
    // }
    // this.fullScreen()
    if(this.activate==='false')
      {
        console.log("in activate function")
        this.isLoggedIn=false;
        this.authservice.updateLoginStatus(false);
      }
    // if(this.activate=='false')
    // {
    //   this.isLoggedIn=false;
    // }

  
     this.checkLoginStatus();
     this.subscription = this.authservice.loginStatus().subscribe(message => {
      this.isLoggedIn = message;
      console.log(message);
    });
  }
  ngAfterViewInit(){
    // this.authservice.setTimer();
  }
  fullScreen() {
    console.log("infull screen")
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen || elem['msRequestFullscreen'] || elem['mozRequestFullScreen'] || elem['webkitRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
}
  checkLoginStatus() {
    this.isLoggedIn = this.authservice.isAuthenticated();
    console.log("isLoggedIn",this.isLoggedIn)

      this.logout()
    
  }
  toQuestions(){
    this.router.navigate(['/questions'])
  }
  logout()
  {
    console.log("##################in logout##########")
    this.authservice.updateLoginStatus(false);
    this.cookieService.delete('activate')
    this.isLoggedIn=false;
    

    this.authservice.logout()
  }
  // questionsPage()
  // {
  //   this.router.navigate(['/questions']);
  // }
}