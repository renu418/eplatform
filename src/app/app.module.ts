import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormField, MatFormFieldModule, MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material";
import { AceComponent } from './components/ace/ace.component';
import { AceEditorModule } from 'ng2-ace-editor';
// import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule} from "ngx-toastr";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {AuthguardService} from '../app/guards/authguard.guard';
import {AuthService} from '../app/services/auth.service';
import { APP_ROUTES } from './routes/app.routes';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { MbscModule } from '@mobiscroll/angular-lite';
import { CountdownModule } from 'ngx-countdown';
import { NavComponent } from './nav/nav.component';
import { CookieService } from 'ngx-cookie-service';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import {NgxSpinnerModule } from 'ngx-spinner';
import {TerminalComponent} from 'src/app/components/terminal/terminal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionsComponent,
    AceComponent,
    RegisterComponent,
    NavComponent,
    ThankyouComponent,
    TerminalComponent
    // NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    AceEditorModule,
    LayoutModule,
    MbscModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule ,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    HomeModule,
    CountdownModule ,
    NgxSpinnerModule
  ],
  providers: [AuthguardService,AuthService,CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
