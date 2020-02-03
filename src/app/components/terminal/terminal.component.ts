import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  show:boolean=false;
  constructor() { }
  @ViewChild('editor', { static: false }) editor;
  @ViewChild(HomeComponent, { static: false }) home;
  ngOnInit() {
  
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
    
  }
  change(){
    console.log("in toogle")
    if(this.show==true)
    {
      this.show=false;
    }
    else{
      this.show=true;
    }
  }

}
