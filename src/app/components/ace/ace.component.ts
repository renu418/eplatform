import { Component, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EportalService } from "src/app/services/eportal.service";
import { HomeComponent } from '../home/home.component';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import {NavService} from 'src/app/services/nav.service'
import { ThrowStmt } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';
@Component({

  selector: 'app-ace',
  templateUrl: './ace.component.html',
  styleUrls: ['./ace.component.scss'],
  

})
export class AceComponent {

  input = {};
  URL = "";
  urlsafe: SafeResourceUrl;
  notifications = 0;
  count:any;
  fileName = "";
  ExecuteMyFunction(value: any): void {
    console.log(value);
  }
  
  @ViewChild('editor', { static: false }) editor;
  @ViewChild(HomeComponent, { static: false }) home;
 
  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: EportalService,
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    private authservice: AuthService,
    private navservice:NavService,
    private cookieService: CookieService) { 
      
      // localStorage.setItem("activate","true")
    }
    
  ngOnInit() {
    this.cookieService.set("activate","true")  
    this.route.queryParams.subscribe(params => {
      console.log("params:", params.file);
      this.fileName = params.file;
    });

    this.URL = localStorage.getItem("url")
    console.log("EEEEEEEEEEEEEEEEEEEEEE", this.URL);
    this.urlsafe=this.sanitizer.bypassSecurityTrustResourceUrl(this.URL);
    console.log("EEEEEEEEEEEEEEEEEEEEEE", this.urlsafe);
  }
  ngAfterViewInit() {

    this.editor.getEditor().setOptions({
      showLineNumbers: true,
      tabSize: 2
    });

    this.editor.mode = 'python';
    this.editor.setTheme('twilight');
    this.editor.value = `function testThis() {
  console.log("it's working!")
}`

    this.editor.setOptions({
      fontSize: "13pt"
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {

      }
    })
    this.showfilecontent();
  }

  getValue() {
    console.log(this.editor.value)
    this.input = this.editor.value;
    console.log(this.input)
    let data = { 'file': this.fileName, 'val': this.input };
    console.log(data)
    this.service.fileAndData(data).subscribe(res => {
      console.log(res);
    });

  }
 
  showfilecontent() {
    console.log('renu');
    console.log(this.fileName)
    let file = { 'val': this.fileName };
    console.log("showcontent:", file)
    this.service.showcontent(file).subscribe(out => {
      console.log("response:", out);
      out = out['response'];
      console.log("after modification:", out)
      // this.editor.setValue(out,1);
      this.editor.value = out;
    });
  }
  update(){
    this.authservice.updateLoginStatus(false);
  }

  runtest()
  {
    this.update()
    this.authservice.logout();
    this.service.testing().subscribe(out => {
      console.log("response:", out);
    });
  }
  questionsPage()
  {
    this.router.navigate(['/questions']);
  }

  }


