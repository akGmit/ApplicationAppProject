import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private http: HttpClient) { }

  private newUser: User;

  ngOnInit() {
  }

  onCreate(form : NgForm){
    if(!form.valid){
      console.log("form not valid");
      return;
    }

    this.newUser = {firstName: form.value.fname, lastName: form.value.lname,
              username: form.value.username, password: form.value.password};

    console.log(this.newUser);
    this.createNewUser(this.newUser).subscribe(res =>{
      
    });
  }

  createNewUser(usr : User): Observable<any>{
    return this.http.post("http://localhost:8081/newuser", usr);
  }
}

  

/*<mat-form-field>
        <input matInput 
        name = "email" 
        #email="ngModel" 
        placeholder="Enter your email" 
        type="email"
        pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
        ngModel required/>
        <mat-error *ngIf="email.invalid">Must be valid format email address.</mat-error>
        */