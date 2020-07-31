import { Component } from '@angular/core';

import { TasksApiService } from '../_services/tasks-api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(public tasks: TasksApiService, public router: Router){}

  openPage(link: string){
    window.open(link)
  }

  removePrivacyLink(){
    document.querySelector("#PRIVACY").remove()
  }

}
