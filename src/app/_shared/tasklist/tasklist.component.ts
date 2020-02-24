import { Component, Input, OnChanges } from '@angular/core';

import { TasksApiService } from '../../../_services/tasks-api.service';

@Component({
  selector: 'tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})

export class TasklistComponent implements OnChanges {

  constructor(private tasksAPI: TasksApiService) { }

  @Input() data: {} = {};
  @Input() tasks: {} = {};

  listHasTasks: boolean = false;

  ngOnChanges() {
    this.listHasTasks = (Object.keys((this.tasks || {})).length) != 0;
  }

  String(o: Boolean){
    return String(o)
  }

}