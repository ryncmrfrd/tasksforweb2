import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FormsService {

  constructor(){}

  tasklistAddIsOpen = false;
  tasklistEditIsOpen = false;
  taskAddIsOpen = false;

  toggleTasklistAdd(txt){ 
    if(txt == 'show'){
      this.tasklistAddIsOpen = true;
      this.taskAddIsOpen = false;
      this.tasklistEditIsOpen = false;
    } else{
      this.taskAddIsOpen = false;
      this.tasklistAddIsOpen = false;
      this.tasklistEditIsOpen = false;
    }
  }

  toggleTasklistEdit(txt){ 
    if(txt == 'show'){
      this.tasklistEditIsOpen = true;
      this.taskAddIsOpen = false;
      this.tasklistAddIsOpen = false;
    } else{
      this.taskAddIsOpen = false;
      this.tasklistAddIsOpen = false;
      this.tasklistEditIsOpen = false;
    }
  }

  toggleTaskAdd(txt){
    if(txt == 'show'){
      this.taskAddIsOpen = true;
      this.tasklistAddIsOpen = false;
      this.tasklistEditIsOpen = false;
    } else{
      this.taskAddIsOpen = false;
      this.tasklistAddIsOpen = false;
      this.tasklistEditIsOpen = false;
    }
  }

}