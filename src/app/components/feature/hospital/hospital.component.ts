import {Component, effect, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../interface/user.entity";
import {HospitalService} from "../../services/hospital.service";
import {HospitalDTO} from "../../interface/hospital.entity";

@Component({
  selector: 'app-hospital',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.scss'
})
export class HospitalComponent {

  hospitalService=inject(HospitalService)
  hospitalDTOS:HospitalDTO[]=[]

  constructor() {
    effect(() => {
      this.hospitalDTOS=this.hospitalService.all()
    });
  }

}
