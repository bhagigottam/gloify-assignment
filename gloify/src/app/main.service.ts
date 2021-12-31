import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { 
    
  }

  tasksMain:any=[];

  getTasks(){
    const headers = new HttpHeaders({'AuthToken':environment.apikey});
    this.http.get("https://devza.com/tests/tasks/list",{headers:headers}).subscribe((data)=>{
      console.log(data);
      
    })
  }
  

  getUsers(){
    const headers = new HttpHeaders({'AuthToken':environment.apikey});
   return this.http.get("https://devza.com/tests/tasks/listusers",{headers:headers});
  }

  addTask(task:any){
    const headers = new HttpHeaders({'AuthToken':environment.apikey});
    this.http.post("https://devza.com/tests/tasks/create",{message:JSON.stringify(task)},{headers:headers}).subscribe((data)=>{
      console.log(data);
      
    })
    this.tasksMain.push(task);
    this.tasksSubj.next({updated:true,edit:false,id:null});
  }

  editDone(task:any){
    this.tasksMain.forEach((data:any)=>{
      if(data.id==task.id){
        data.title = task.title;
        data.description = task.description;
        data.user = task.user;
        data.priority = task.priority;
        data.date = task.date;
      }
    })

    this.tasksSubj.next({updated:true,edit:false,id:null});    
  }

  tasksSubj = new Subject();

  deleteTask(taskid:any){
    this.tasksMain.forEach((dataa:any)=>{
      if(dataa.id==taskid){
        dataa.isVisible=false;
      }
    })
  }
}
