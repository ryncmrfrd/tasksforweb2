import { Component, OnInit } from '@angular/core';
import { TasksApiService } from 'src/_services/tasks-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public tasks:TasksApiService) { }

  isLoaded = false;

  async ngOnInit() {
    await this.tasks.init();
    this.isLoaded = true;
  }

}
