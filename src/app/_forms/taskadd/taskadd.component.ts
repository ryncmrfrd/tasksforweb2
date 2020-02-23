import { Component, OnInit } from '@angular/core';
import { TasksApiService } from 'src/_services/tasks-api.service';
import { FormsService } from 'src/_services/forms.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'taskAdd',
  templateUrl: './taskadd.component.html',
  styleUrls: ['./taskadd.component.scss']
})

export class TaskaddComponent implements OnInit {

  taskaddForm;

  constructor(private formBuilder: FormBuilder, private tasks: TasksApiService, private forms: FormsService) { 
    this.taskaddForm = this.formBuilder.group({
      title: [ null, Validators.required ]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.taskaddForm)
  }

}
