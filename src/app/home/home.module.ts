import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthguardService } from '../guards/authguard.guard';
import { registerRoutes } from '../routes/register.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(registerRoutes)
  ],
  providers: [AuthguardService]
})
export class HomeModule { }