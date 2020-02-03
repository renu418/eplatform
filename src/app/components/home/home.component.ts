import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EportalService } from "src/app/services/eportal.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name = "renu";
  input: any;
  gottyURL:string;
  loginForm: FormGroup;
  submitted = false;
  isLoggedIn = false;
  
  constructor(private router: Router,
    private service: EportalService,
    private http: HttpClient,
    private tostr: ToastrService,
    private authservice: AuthService,
    private navService: NavService,
    private cookieService: CookieService) {
      // localStorage.setItem("activate","false") 
     
    }

  ngOnInit() {
    this.cookieService.set("activate","false") 
    this.loginForm = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
   
  
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
   
    this.validateEmail();

  }
  signUp(){
    console.log('in register')
    this.router.navigate(['/register']);
    console.log('in register')
  }

  nextPage() {
    console.log("//////////nextpage///////////")
    this.router.navigate(['/questions']);
  }
 


  validateEmail() {
    let userData = {
      
      "password": this.loginForm.value.password,
      "email": this.loginForm.value.email,

    }
    console.log("userdata:", userData)
    this.service.validateEmail(userData).subscribe(result => {
      console.log("response from db: ", result);
        
        if(result['statuscode']==200)
        { console.log("200")
          this.loginForm.reset();
          console.log("token: ",result['token'])
          localStorage.setItem('token', result['token']);
          this.authservice.setTime()
          // localStorage.setItem('lastAction', new Date().toISOString());
          this.authservice.updateLoginStatus(true);
          // this.authservice.setTimer();
          this.nextPage();
          
        }
        else if(result['statuscode']==401){
            this.loginForm.reset();
            this.tostr.error("password is wrong","ERROR")
        }
        else if(result['statuscode']==404){
          this.loginForm.reset();
          this.tostr.error("user not found","ERROR")
        }
        

    })
  }

}
