import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService : UserService) { }

  private user : string;

  ngOnInit() {
    this.user = this.userService.getUser().firstname + " " + this.userService.getUser().lastname;
  }

}
