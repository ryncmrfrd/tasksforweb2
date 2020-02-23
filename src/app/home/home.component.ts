import { Component, OnInit } from '@angular/core';

import { TasksApiService } from '../../_services/tasks-api.service';
import { FormsService } from '../../_services/forms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(public tasks: TasksApiService, private forms: FormsService) { }

  loadingState = "";
  tasksGetPercentage = 0;

  async ngOnInit() {
    this.loadingState = "Initializing Google tasks API.";
    await this.tasks.init();
    this.loadingState = "Fetching tasklists.";
    await this.tasks.tasklistGet();
    this.loadingState = "Getting Tasks.";
    for(let i = 0; i < this.tasks.tasklists.length; i++){
      this.tasksGetPercentage = Math.round(i * 100 / this.tasks.tasklists.length);
      await this.tasks.tasksGet( this.tasks.tasklists[i].id ); //get tasks for each tasklist
    }
    this.tasks.selectedTaskList = this.tasks.tasklists[0].id;
    this.tasks.loaded = true;
  }

  changeSelectedTasklist(val: String) { this.tasks.selectedTaskList = val }

}