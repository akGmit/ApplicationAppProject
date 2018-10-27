import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;  

  constructor(private http: HttpClient){
  }

  loggedIn(){
    this.isLoggedIn = true;
  }

  login(user:User): Observable<any>{
    /*const usr : User = {username : username, password: password
      , firstName: "ASDF", lastName: "ASDF"};*/
    return this.http.post("http://localhost:8081/login", user);
  }

  logout(): void {
    
  }
}
