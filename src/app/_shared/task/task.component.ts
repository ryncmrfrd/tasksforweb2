import { Component, Input } from '@angular/core';
import { TasksApiService } from 'src/_services/tasks-api.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  constructor(private tasks: TasksApiService) { }

  @Input() details: {} = {};

  completeTask(){ this.tasks.tasksComplete(this.tasks.selectedTaskList, this.details['id']) }
  deleteTask(){ this.tasks.tasksDelete(this.tasks.selectedTaskList, this.details['id']) }

  onTitleChange(txt){ this.tasks.tasksEdit(this.tasks.selectedTaskList, this.details['id'], {"title":txt}) }
  onNotesChange(txt){ this.tasks.tasksEdit(this.tasks.selectedTaskList, this.details['id'], {"notes":txt}) }

}
