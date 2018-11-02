import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLoggedIn = false;  

  constructor(private http: HttpClient){
  }
  //Set userLoggedIn to true after user authorization succesful
  loggedIn(){
    console.log("Auth service logged in");
    this.userLoggedIn = true;
  }
  //Return userLoggedIn
  isLoggedIn(): boolean{
    return this.userLoggedIn;
  }

  //Sending login infomation and returning response
  login(user:User): Observable<any>{
    //Post login details to server and return response 
    return this.http.post("http://localhost:8081/login", user);
  }
}
