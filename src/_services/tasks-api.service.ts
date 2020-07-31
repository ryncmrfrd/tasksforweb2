import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class TasksApiService {

  constructor( private router: Router ) { }

  public loaded = false;

  public selectedTaskList;

  public tasks: {} = {};
  public tasklists: Array<any> = [];

  private api = require('google-tasks-api');
  private gauthcode: string = '248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com';

  private findWithAttr(array, attr, value) {
    for(let i = 0; i < array.length; i++) {
        if(array[i][attr] === value) { return i }
    }
    return -1;
  }

  public isInited = false;

  async init(){
    if(this.isInited) return true;
    await this.api.authorize(this.gauthcode).catch(e => this._error('Error authorising client', e) );
    this.isInited = true;
    var isLoggedIn = this.isloggedin();
    if(!isLoggedIn){
      this.router.navigate(['/login']);
      return false;
    }
    await this.api.loadClient().catch(e => this._error('Error loading client', e) );
    return true
  }

  login(){  return this.api.signIn().catch(e => this._error('Error signing in', e)); }
  logout(){  return this.api.logout().catch(e => this._error('Error logging out', e)); }
  isloggedin(){  return this.api.isSignedIn() }

  async tasksGet(tasklistID){ 
    
    var tasks = await this.api.listTasks(tasklistID).catch(e => this._error('Error getting tasks.', e) );
    if(!tasks) return []; //If tasklist is empty DO NOT return 'undefined', return '[]'
    else {
      this.tasks[tasklistID] = tasks.filter(value => { return value.status == 'needsAction' }); //Return only unfinished tasks
      this.tasks[tasklistID].sort((a, b) => { return a['position'] - b['position'] }); //Sort by 'position' value
      return tasks;
    }
  }

  async tasksAdd(tasklistID, details){
    
    var newtask = await this.api.insertTask(tasklistID, details).catch(e => { this._error('Error adding task.', e) });
    this.tasks[tasklistID].push(newtask); //Add new task to array
    this.tasks[tasklistID].sort((a, b) => { return a['position'] - b['position'] }); //Sort by 'position' value
    return newtask
  }

  async tasksEdit(tasklistID, taskID, details){
    
    //return if title/notes have not changed
    var taskObj = this.tasks[tasklistID][this.findWithAttr(this.tasks[tasklistID], 'id', taskID)];
    if((details.title && details.title == taskObj.title) || (details.notes && details.notes == taskObj.notes)) return;

    var editedtask = await this.api.updateTask(tasklistID, taskID, details).catch(e => this._error('Error editing task.', e) );
    return editedtask
  }

  async tasksMove(tasklistID, taskID, previous){
    
    var movedtask = await this.api.moveTask(tasklistID, taskID, previous).catch(e => this._error('Error moving task.', e) );
    this.tasks[tasklistID].sort((a, b) => { return a["position"] - b["position"] }); //Sort by 'position' value
    return movedtask
  }

  async tasksComplete(tasklistID, taskID){
    
    document.querySelector(`#${taskID}`).classList.add("completed"); 

    var completedtask = await this.api.updateTask( tasklistID, taskID, { "status": "completed" } ).catch(e => this._error('Error completing task.', e) );

    //Remove the deleted item from tasks arr
    this.tasks[tasklistID];
    var indexToDelete = this.findWithAttr(this.tasks[tasklistID], 'id', taskID);
    this.tasks[tasklistID].splice(indexToDelete, 1);

    return completedtask;
  }

  async tasksDelete(tasklistID, taskID){
    
    document.querySelector(`#${taskID}`).classList.add("deleted"); 

    var deletedtask = await this.api.deleteTask(tasklistID, taskID).catch(e => this._error('Error deleting task.', e) );

    //Remove the deleted item from tasks arr
    this.tasks[tasklistID];
    var indexToDelete = this.findWithAttr(this.tasks[tasklistID], 'id', taskID);
    this.tasks[tasklistID].splice(indexToDelete, 1);

    return deletedtask
  }

  async tasklistGet(){
    
    var tasklists = await this.api.listTaskLists().catch(e => this._error('Error fetching tasklists.', e) );
    this.tasklists = tasklists;
    return tasklists
  }

  async tasklistAdd(title){
    var addedtasklist = await this.api.insertTaskList(title).catch(e => this._error('Error adding tasklist.', e) );
    this.tasklists.push(addedtasklist);
    return addedtasklist
  }

  async tasklistEdit(tasklistID, title){
    
  }

  async tasklistDelete(tasklistID){

    var deletedtasklist = await this.api.deleteTaskList(tasklistID).catch(e => this._error('Error deleting tasklist.', e) );
    
    // remove tasklist from array
    var indexToDelete = this.findWithAttr(this.tasklists, 'id', tasklistID);
    this.tasklists.splice(indexToDelete, 1);
    // remove tasks from array
    delete this.tasks[tasklistID]
    
    return deletedtasklist
  }

  public error = false;
  public errorState = "";
  _error(txt, error){
    this.loaded = true;
    this.error = true;
    this.errorState = txt;
    console.warn('Error details:', error);
    throw new Error(`Critical error: ${txt}`)
  }

}