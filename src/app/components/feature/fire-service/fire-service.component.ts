import {Component, effect, inject} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../interface/user.entity";
import {FireService} from "../../services/fire.service";
import {FireDTO} from "../../interface/fire.entity";

@Component({
  selector: 'app-fire-service',
  standalone: true,
  imports: [],
  templateUrl: './fire-service.component.html',
  styleUrl: './fire-service.component.scss'
})
export class FireServiceComponent {


  fireService=inject(FireService)
  fireDTOS:FireDTO[]=[]

  constructor() {
    effect(() => {
      this.fireDTOS=this.fireService.all()
    });
  }

}
