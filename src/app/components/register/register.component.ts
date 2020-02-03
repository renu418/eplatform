import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EportalService } from "src/app/services/eportal.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  gottyURL: string;
  radioSelected: any;
  languages: any = ["Python", "Java", "C++", "C", "ReactJS", "NodeJS"];
  registerForm: FormGroup;
  submitted = false;


  constructor(private router: Router,
    private service: EportalService,
    private http: HttpClient,
    private tostr: ToastrService,
    private spinner:NgxSpinnerService,
    private cookieService: CookieService
  ) { 
    // localStorage.setItem("activate","false")
  
}

  ngOnInit() {
    this.cookieService.set("activate","false") 
    this.registerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      CGPA: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      UniversityName: new FormControl('', Validators.required),
      languageSelect: new FormControl('', Validators.required),


    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // this.changeTo();
    this.insertInfo();

  }
  nextPage() {
    console.log("//////////nextpage///////////")
    this.router.navigate(['/home']);
  }

  changeTo() {
    let lang = { "lang": this.radioSelected };
    this.service.getURL(lang).subscribe(res => {

      console.log("url: ", res);
      console.log("resurl: ", res['response'])
      this.gottyURL = res['response']
      localStorage.setItem("url", res['response'])


    },
      err => { console.log("got this error:", err) });
  }

 

  onItemChange(event) {
    console.log(this.registerForm.value.languageSelect);

    this.radioSelected = this.registerForm.value.languageSelect;
    console.log(this.radioSelected);

    var lang=this.radioSelected
    if(lang=='Java')
    {
      let payload={"deploy":"gottyjava",
      "service":"javaservice",
      "py_filepath":"../data/spawn_ctr_rtrn_url.py",
      "service_filepath":"../data/javagottyservice.yaml",
      "deploy_filepath":"../data/javagottydeploy.yaml"}   
      console.log(payload)
      this.service.changeGottyFiles(payload).subscribe(res=>{
        console.log(res)
      })


    }else if(lang=='Python'){

    }
 
  }

  

  insertInfo() {
    let Data = {
      "name": this.registerForm.value.fullName,
      "CGPA": this.registerForm.value.CGPA,
      "email": this.registerForm.value.email,
      "college": this.registerForm.value.UniversityName,
      "language": this.registerForm.value.languageSelect
    }
    console.log("userdata:", Data)
    this.spinner.show();
    setTimeout(() => {
    this.spinner.hide();
    this.service.userDataInsert(Data).subscribe(result => {
      // this.tostr.error("Username or password is wrong")
      console.log("response from db: ", result);
      
         
      
        
          // this.router.navigate(['/home'])
          
         
        
        if(result['statuscode']==200)
        {
          this.changeTo(); 
          this.router.navigate(['/home'])
          console.log("mailData:",Data)
         this.service.sendMail(Data).subscribe(content =>{

          console.log("response from mail: ", content);
         })
          // this.nextPage();
          
        }
        else if(result['statuscode']==404)
        {
          this.registerForm.reset();
          this.tostr.error("user already exist with this email","ERROR")
        }
        

    })}, 3000);

  }
      
}