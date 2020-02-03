import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AceComponent } from './components/ace/ace.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthguardService } from '../app/guards/authguard.guard';
import {NavComponent} from './nav/nav.component';
import{ThankyouComponent} from 'src/app/components/thankyou/thankyou.component'
import {TerminalComponent} from 'src/app/components/terminal/terminal.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "questions", component: QuestionsComponent},
  { path: "editor/:str", component: AceComponent },
  { path: "register", component: RegisterComponent },
  { path: "", component: HomeComponent },
  { path: "nav", component: NavComponent },
  { path: "thankyou", component: ThankyouComponent },
  { path:"terminal",component:TerminalComponent}

  
];
// canActivate: [AuthguardService] 
@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
