import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class TasksApiService {

  constructor() { }

  public loaded = false;

  public selectedTaskList;

  public tasks: {} = {};
  public tasklists: Array<any> = [];

  private api = require('google-tasks-api');
  private gauthcode: string = '248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com';

  private findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

  async init(){
    await this.api.authorize(this.gauthcode).catch(e => this._error('Error authorizing API.', e) );
    await this.api.loadClient().catch(e => this._error('Error loading client', e) );
    return true
  }

  login(){ return this.api.signIn() }
  logout(){ return this.api.logout() }
  isloggedin(){ return this.api.isSignedIn() }

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
    var completedtask = await this.api.updateTask( tasklistID, taskID, { "status": "completed" } ).catch(e => this._error('Error completing task.', e) );

    //Remove the deleted item from tasks arr
    this.tasks[tasklistID];
    var indexToDelete = this.findWithAttr(this.tasks[tasklistID], 'id', taskID);
    this.tasks[tasklistID].splice(indexToDelete, 1);

    return completedtask;
  }

  async tasksDelete(tasklistID, taskID){
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