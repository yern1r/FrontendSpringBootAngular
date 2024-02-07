import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //because we are using http client
    HttpClientModule
  ],
  //provide this service to all which located in the root
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
