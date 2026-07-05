import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInterceptor } from './Interceptors/authentication.interceptor';
import { ErrorHandlingInterceptor } from './Interceptors/error-handling.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RolesComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true
    })
  ],
  providers: [
      {provide:HTTP_INTERCEPTORS,useClass:AuthenticationInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
