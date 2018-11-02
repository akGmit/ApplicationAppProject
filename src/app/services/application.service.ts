import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from "../models/user";
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http : HttpClient, private userService: UserService) { }

  private application : Application;

  saveApplication(app): Observable<any>{
    this.application = { id: this.userService.getUser().id, firstname: app.firstname, lastname: app.lastname,
           tel: app.tel, email: app.email, address: app.address, experience: app.experience,
              bio: app.bio};
    

    console.log(this.application);

    return this.http.post('http://localhost:8081/application', this.application);
  }

}
