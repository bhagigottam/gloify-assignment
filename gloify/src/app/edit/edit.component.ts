import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from '../main.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit,OnChanges {
  myForm:any;

  constructor(private _snackBar: MatSnackBar, private mainService:MainService) { }

  ngOnChanges(changes: SimpleChanges): any {

    if(changes){
  if(changes['updateTask']){

    if(changes['updateTask'].currentValue){
        console.log(changes);
this.edit = true;


      }
  }
      }   
  }

  edit=false;

  ngOnInit() {
   this.mainService.getTasks();

    if(this.edit){
      console.log(this.updateTask);

      this.dateVal = this.updateTask.date;
      
      this.myForm = new FormGroup({
        title: new FormControl(this.updateTask.title),
        description: new FormControl(this.updateTask.description),
        priority: new FormControl(this.updateTask.priority),
        date: new FormControl(this.updateTask.date),
        user:new FormControl(this.updateTask.user)
      });

    }else{
      this.myForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        priority: new FormControl('low'),
        date: new FormControl(''),
        user:new FormControl('Arpit')
      });
    }

    this.myForm.controls['title'].setValidators([Validators.required]),
    this.myForm.controls['description'].setValidators([Validators.required]),
    this.myForm.controls['priority'].setValidators([Validators.required]),
    this.myForm.controls['user'].setValidators([Validators.required])


  }

  dateChanged(eve:any){
    console.log(eve.value);
    
    this.myForm.get('date').setValue(String(eve.value).slice(3,15),{onlySelf:true});
    this.dateVal = String(eve.value).slice(3,15);
  }

  dateVal="";

  changePri(eve:any){
    this.myForm.get('priority').setValue(eve.target.value, {
      onlySelf: true
    })
  }

  @Input('updatetask') updateTask:any=null;
  @Input('users') users:any=[];
  
  priorities=["low","medium","high"];

  onSubmit(form: FormGroup) {
    console.log(form);
    console.log('title', form.value.title); // true or false
    console.log('description', form.value.description);
    console.log('priority', form.value.priority);
    console.log('date', form.value.date);
    console.log('user', form.value.user);
    if(form.value.title==""||form.value.description==""||form.value.priority==""||form.value.date==""||form.value.user==""){
      this._snackBar.open("Please fill all the inputs", 'ok',{duration:4000});
      return;
    }

    let objj = {id:String(new Date().getTime()),title:form.value.title,description: form.value.description,priority:form.value.priority,date:String(form.value.date).slice(3,15),user:form.value.user,isVisible:true};
    
    if(this.edit){
      let finDate = this.updateTask.date;
      if(this.updateTask.date==form.value.date){

      }else{
        finDate = String(form.value.date).slice(3,15);
      }
      objj = {id:this.updateTask.id,title:form.value.title,description: form.value.description,priority:form.value.priority,date:finDate,user:form.value.user,isVisible:true};
      this.mainService.editDone(objj);
    }else{

      this.mainService.addTask(objj);
    }

  }

}
