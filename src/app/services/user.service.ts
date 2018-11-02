//Service to retrieve authorized user data
import { Injectable } from '@angular/core';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private user : User;

  //Load user after authorization
  loadUser(usr){
    this.user = {username: usr.username, password: usr.password, firstname: usr.firstname, lastname: usr.lastname,
        id: usr._id};
  }
  //Get user data
  getUser(): User{
    if(this.user == null){ 
      return;
    }
    return this.user;
  }
}
