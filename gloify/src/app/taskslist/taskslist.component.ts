import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-taskslist',
  templateUrl: './taskslist.component.html',
  styleUrls: ['./taskslist.component.scss']
})
export class TaskslistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input('tasks') tasks = [];
  @Input('searchtext') searchtext:any;

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // tasks = [{id:"345",title:"kjbhgkjglvbk",priority:"low",description:"sg wegtwkrjh irhj liuhr kjdsrh;g",date:"kjhg joiejrgo"},{id:"347",title:"kjbhgkjglvbk",priority:"medium",description:"sg wegtwkrjh irhj liuhr kjdsrh;g",date:"kjhg joiejrgo"},{id:"348",title:"kjbhgkjglvbk",description:"sg wegtwkrjh irhj liuhr kjdsrh;g",date:"kjhg joiejrgo",priority:"medium"},{id:"349",priority:"high",title:"kjbhgkjglvbk",description:"sg wegtwkrjh irhj liuhr kjdsrh;g",date:"kjhg joiejrgo"}];
  taskUpdate(event:any){
    // console.log(event);
    // this.tasks.forEach((val,ind)=>{
    //   if(val.id==event.id){
    //     this.tasks.splice(ind,1);
    //   }
    // })
    
  }
}
