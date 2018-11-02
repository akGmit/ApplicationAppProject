import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "./auth/auth.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ApplicationApp';

  constructor(private router: Router, private authService: AuthService){

  }
 
  ngOnInit(){
    //Check if user logged in, if not - set route to login page
    if(!(this.authService.isLoggedIn())){
      console.log("onInint app.comp");
      this.router.navigate(['/login']);
    }
  }

}
