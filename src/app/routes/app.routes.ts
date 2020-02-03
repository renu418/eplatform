import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { registerRoutes } from './register.routes';

export const APP_ROUTES: Routes = [
    { path: "home", component: HomeComponent },
    { path: "", redirectTo: "/questions", pathMatch: "full" },
    { path: "**", component: RegisterComponent }
  ];
  