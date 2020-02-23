import { Component } from '@angular/core';

import { TasksApiService } from '../_services/tasks-api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private tasks: TasksApiService){}

  ngOnInit(): void {
    this.tasks.init();
  }

}
