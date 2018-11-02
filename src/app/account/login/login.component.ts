import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userService : UserService) { }
  //User type object
  private user : User;
  private wrongDetailsMessage :string;
  

  ngOnInit() {
  }
  //Method takin login form data and sending it to auth service 
  onLogIn(form: NgForm){
    //Validate login form
    if(!form.valid){
      console.log("for not good");
      this.wrongDetailsMessage = null;
      return;
    }

    //Save form data to local user type variable
    this.user = {username: form.value.username, password: form.value.password,
                      firstname: "", lastname: "", id: ""};
    
                      //Send login data to auth service login() method and subscribe
    //Deal with a response from this method  
    this.authService.login(this.user).subscribe(res =>
    {
      //Check response
      //If not null - login succesful and redirect user to home route
      //Update auth service loggedIn variable to true
      //Save user data to UserService 
      if(res !== null){
        this.authService.loggedIn();
        this.userService.loadUser(res);
        this.router.navigate(['/home']);
      //If response is null - authorization failed
      //Display message
      }else if(res === null){
        this.wrongDetailsMessage = "Wrong username or password!";
      }    
    });
  }
}
