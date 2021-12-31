import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private mainService:MainService) { }
  tasksList:any=[];

  users:any[]=[];

  ngOnInit(): void {

    this.mainService.getUsers().subscribe((data:any)=>{
      data.users.forEach((user:any)=>{
        this.users.push(user.name);
      })
    })
    this.mainService.tasksSubj.subscribe((data:any)=>{
      if(data.updated){

        this.tasksList = this.mainService.tasksMain;
        console.log(this.tasksList);
        this.showNewModal = false;
        this.editMoidal = false;
      }
      if(data.edit){
        this.tasksList.forEach((tassk:any)=>{
          if(tassk.id==data.id){
            this.taskToEdit = tassk;
            this.editMoidal=true
          }
        })
      }
      
    })
  }
  selectedProfile="All";
  changedProfile(eve:any){
      console.log(eve);
      this.selectedProfile = eve.srcElement.value;
      this.tasksList = this.mainService.tasksMain ;
      if(this.selectedProfile=="All"){
        return;
      }

      let filteredAr:any = [];
      this.tasksList.forEach((val:any,ind:any)=>{
        if(val.user==this.selectedProfile){
          filteredAr.push(val);
        }
      })

      this.tasksList = filteredAr;
  }

  searchText:any;

  editMoidal=false;

  taskToEdit:any;
  showNewModal=false;
  openNewTask(){
    this.showNewModal = true;
  }

}
