import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from '../main.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input('taskdata') taskdata ={id:"",title:"",description:"",date:"",priority:"medium",isVisible:true};
  @Output('changetask') changetask = new EventEmitter<any>();
  constructor(private main:MainService) { }

  ngOnInit(): void {
  }

  updateTask(){
    this.main.tasksSubj.next({edit:true,id:this.taskdata.id,updated:false});
  }

  deleteIt(){
    this.main.deleteTask(this.taskdata.id);
  }

}
