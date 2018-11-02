import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from "../services/user.service";
import { NgForm } from "@angular/forms";
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder, private appService: ApplicationService) { }

  ngOnInit() {
    console.log(this.userService.getUser().firstname);
  }
  
  private applicationCreatedMessage : String = null;
  
  applicationForm = this.formBuilder.group({
    firstname: [this.userService.getUser().firstname, Validators.required],
    lastname: [this.userService.getUser().lastname, Validators.required],
    tel: ['', Validators.required],
    email: ['',Validators.email],
    address: this.formBuilder.group({
      street: ['',Validators.required],
      city: ['',Validators.required],
      county: ['',Validators.required],
      zip: ['',Validators.required]
    }),
    experience: ['',Validators.required],
    bio: ['',Validators.required]
  });

  onSubmit(){
    console.log(this.applicationForm.value);
    this.appService.saveApplication(this.applicationForm.value).subscribe(res =>
    {
      
      if(res === true){
        
        this.applicationCreatedMessage = "Application saved succesfully!";
      }else if(res === false){
        this.applicationCreatedMessage = "Error while saving application";
      }
    });
  }

  
}
