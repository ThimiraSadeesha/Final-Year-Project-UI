import {Component, effect, Inject, inject} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../interface/user.entity";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {


  userService=inject(UserService)
  userDto:UserDTO[]=[]

  constructor() {
    effect(() => {
      this.userDto=this.userService.all()
    });
  }



}
