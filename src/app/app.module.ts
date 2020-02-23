import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './_shared/task/task.component';
import { TasklistComponent } from './_shared/tasklist/tasklist.component';
import { TasklistaddComponent } from './_forms/tasklistadd/tasklistadd.component';
import { TasklistopenComponent } from './_forms/tasklistopen/tasklistopen.component';
import { TaskaddComponent } from './_forms/taskadd/taskadd.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    TasklistComponent,
    TasklistaddComponent,
    TasklistopenComponent,
    TaskaddComponent,
    // LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
