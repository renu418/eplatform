
import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { QuestionsComponent } from '../components/questions/questions.component';
import { AceComponent } from '../components/ace/ace.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthguardService } from '../guards/authguard.guard';
import {NavComponent} from '../nav/nav.component';
import {ThankyouComponent} from 'src/app/components/thankyou/thankyou.component'
import {TerminalComponent} from 'src/app/components/terminal/terminal.component';

export const registerRoutes: Routes = [
    { path: "questions", 
    component: QuestionsComponent,
    canActivate: [AuthguardService] },

    { path: "editor/:str", 
    component: AceComponent,
    canActivate: [AuthguardService]  },

    { path: "register", 
    component: RegisterComponent },
    
    { path: "", 
    redirectTo: '/register',
    pathMatch: 'full' },

    { path: "home", 
      component: HomeComponent },

    { path: "nav", 
      component: NavComponent },
    
      
      { path: "thankyou", 
      component: ThankyouComponent,
      canActivate: [AuthguardService] 
       },
       { path: "terminal", 
       component: TerminalComponent 
        }
   
  

  ];