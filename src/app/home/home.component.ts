import { Component, OnInit } from '@angular/core';

import { TasksApiService } from '../../_services/tasks-api.service';

import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(public tasks: TasksApiService, public title: Title) { }

  loadingState = "";

  async ngOnInit() {
    this.loadingState = "Initializing API";
    await this.tasks.init();
    this.loadingState = "Fetching tasklists";
    await this.tasks.tasklistGet();
    for(let i = 0; i < this.tasks.tasklists.length; i++){
      this.loadingState = `Getting tasks ${i} of ${this.tasks.tasklists.length}`;
      await this.tasks.tasksGet( this.tasks.tasklists[i].id ); //get tasks for each tasklist
    }
    this.tasks.selectedTaskList = this.tasks.tasklists[0].id;
    this.tasks.loaded = true;
    this.title.setTitle("Tasks For Web");
  }

  changeSelectedTasklist(val: String) { this.tasks.selectedTaskList = val }

  reload(){
    window.location.reload()
  }

}