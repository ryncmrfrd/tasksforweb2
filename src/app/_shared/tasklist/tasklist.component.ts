import { Component, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';

import { TasksApiService } from '../../../_services/tasks-api.service';

@Component({
  selector: 'tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})

export class TasklistComponent implements AfterViewInit {

  constructor(private tasksAPI: TasksApiService) { }

  @Input() data: {} = {};
  @Input() tasks: {} = {};

  listHasTasks: boolean;

  ngAfterViewInit(): void {
    this.listHasTasks = (Object.keys((this.tasks || {})).length > 0) ? true : false;
  }

}