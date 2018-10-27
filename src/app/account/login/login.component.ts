import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  private user : User;

  ngOnInit() {
  }

  onLogIn(form: NgForm){
    
    this.user = {username: form.value.username, password: form.value.password,
                      firstName: "", lastName: ""};
        
    this.authService.login(this.user).subscribe(res =>
    {
      if(res["result"] == "true"){
        this.authService.loggedIn();
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/newuser']);
      }
      
    });
  }
}
