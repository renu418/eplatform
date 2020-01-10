import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EportalService } from "src/app/services/eportal.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
    
  questions:any;
  random:any;
  files:any;
  public show:boolean = false;
  // array1=[{"questions":this.questions, "files":this.files}]
  constructor(private router : Router,
    private service: EportalService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getQuestions();
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
