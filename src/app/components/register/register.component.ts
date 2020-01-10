import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EportalService } from "src/app/services/eportal.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

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
    private tostr: ToastrService
  ) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      CGPA: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      UniversityName: new FormControl('', Validators.required),
      languageSelect: new FormControl('', Validators.required),


    });
  }
  // onSubmit(){
  //   this.registerForm.value.fullName
  // }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // this.changeTo();
    this.insertInfo();

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

  nextPage() {
    console.log("//////////nextpage///////////")
    this.router.navigate(['/home']);
  }

  onItemChange(event) {
    console.log(this.registerForm.value.languageSelect);

    this.radioSelected = this.registerForm.value.languageSelect;
    console.log(this.radioSelected);
  }

  insertInfo() {
    // console.log("datafromform: ",this.registerForm.value.languageSelect);
    // console.log("datafromform: ",this.registerForm.value.CGPA)
    let Data = {
      "name": this.registerForm.value.fullName,
      "CGPA": this.registerForm.value.CGPA,
      "password": this.registerForm.value.password,
      "email": this.registerForm.value.email,
      "college": this.registerForm.value.UniversityName,
      "language": this.registerForm.value.languageSelect
    }
    console.log("userdata:", Data)
    this.service.userDataInsert(Data).subscribe(result => {
      // this.tostr.error("Username or password is wrong")
      console.log("response from db: ", result);
        
        if(result['statuscode']==200)
        {
          this.registerForm.reset();
          this.nextPage();
          this.changeTo();
        }
        // else if(result['statuscode']==401){
        //     this.registerForm.reset();
        //     this.tostr.error("password is wrong","ERROR")
        // }
        // else if(result['statuscode']==404){
        //   this.registerForm.reset();
        //   this.tostr.error("user not found","ERROR")
        // }
        

    })
        //alert("Login Successfully")
      //  },error=>{
      //    this.registerForm.reset();
      //    this.tostr.error("Username or password is wrong")}
      //    //alert("Username or password is wrong")}
      //  ) 

       
      // if (result == "True") {
      //   this.nextPage();
      //   this.changeTo();
      // }
      // else {
      //   this.registerForm.reset();
      //   this.tostr.error("Username or password is wrong")
      // }
  }
      
}