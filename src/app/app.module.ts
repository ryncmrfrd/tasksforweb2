import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './_shared/task/task.component';
import { TasklistComponent } from './_shared/tasklist/tasklist.component';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    TasklistComponent,
    LoginComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
