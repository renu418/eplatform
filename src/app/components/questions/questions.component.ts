import { Component, OnInit , AfterViewInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { EportalService } from "src/app/services/eportal.service";
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from "src/app/services/nav.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
    
  questions:any;
  random:any;
  files:any;
  // subscription: Subscription;
  // public show:boolean = false;
  // isLoggedIn = false;
  // timeLeft: number = 60;
  // interval;
  // timer;

  
  // array1=[{"questions":this.questions, "files":this.files}]
  constructor(private router : Router,
    private service: EportalService,
    private http: HttpClient,
    private authservice: AuthService,
    private navbarService: NavService,
    private cookieService: CookieService
    ) {
      //  localStorage.setItem("activate","true")
      
      }
    // localStorage.setItem("activate","false")
  ngOnInit() {
    this.getQuestions();
    // this.fullScreen();
    this.cookieService.set("activate","true")  
   
  }

  selected(str)
  {
   
    console.log(str);
    this.router.navigate(['/editor',str], { queryParams: { file: str}, queryParamsHandling: 'merge' });
  }
  
   
  getQuestions() {
    this.service.getQuestions().subscribe(res => {
      console.log("full: ",res);
      console.log("data: ",res['data'])
      console.log("random: ",res['random'])
      this.questions=res['data']
      this.random=res['random']
      this.files=res['files']
      console.log(this.questions)
      console.log(this.random)
      console.log(this.files)
     

    },
    err => {console.log("got this error:",err)});
    }
    
    
}
