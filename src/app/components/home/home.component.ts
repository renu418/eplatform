import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EportalService } from "src/app/services/eportal.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

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
  
  constructor(private router: Router,
    private service: EportalService,
     private http: HttpClient,
     private tostr: ToastrService) { }

  ngOnInit() {
    
    this.service.getService().subscribe((out: any) => { 
      console.log(out);
      this.input =out;
     
    });
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

    // this.changeTo();
    this.validateEmail();

  }
  // changeTo() {
  //   this.service.getURL().subscribe(res => {
  //     console.log("url: ",res);
  //     console.log("resurl: ",res['response'])
  //     this.gottyURL= res['response']
  //     localStorage.setItem("url", res['response'])

  //   },
  //   err => {console.log("got this error:",err)});
  // }

  nextPage() {
    console.log("//////////nextpage///////////")
    this.router.navigate(['/questions']);
  }

  validateEmail() {
    // console.log("datafromform: ",this.registerForm.value.languageSelect);
    // console.log("datafromform: ",this.registerForm.value.CGPA)
    let userData = {
      
      "password": this.loginForm.value.password,
      "email": this.loginForm.value.email,

    }
    console.log("userdata:", userData)
    this.service.validateEmail(userData).subscribe(result => {
      // this.tostr.error("Username or password is wrong")
      console.log("response from db: ", result);
        
        if(result['statuscode']==200)
        {
          this.loginForm.reset();
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
