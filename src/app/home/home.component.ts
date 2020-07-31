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
    if(this.tasks.isInited || this.tasks.loaded) return;
    this.loadingState = "Initializing API";
    var isLoggedIn = await this.tasks.init();
    if(!isLoggedIn) return;
    this.loadingState = "Fetching tasklists";
    await this.tasks.tasklistGet();
    for(let i = 0; i < this.tasks.tasklists.length; i++){
      this.loadingState = `Getting tasks ${i} of ${this.tasks.tasklists.length}`;
      await this.tasks.tasksGet( this.tasks.tasklists[i].id ); //get tasks for each tasklist
    }
    this.tasks.selectedTaskList = this.tasks.tasklists[0].id;
    this.tasks.loaded = true;
    console.log(this.tasks.tasklists)
    console.log(this.tasks.tasks)
  }

  changeSelectedTasklist(val: String) { this.tasks.selectedTaskList = val }
  reload(){ window.location.reload() }

  addTask(){
    var taskName = prompt("Please enter a name");
    this.tasks.tasksAdd(this.tasks.selectedTaskList, {"title": taskName})
  }

  addTaskList(){
    var taskListName = prompt("Please enter a name");
    this.tasks.tasklistAdd(taskListName)
  }

  async removeTaskList(val: string){
    this.changeSelectedTasklist(this.tasks.tasklists[0].id)
    this.tasks.tasklistDelete(val);
  }


}