import {Component, effect, inject} from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {HospitalDTO} from "../../interface/hospital.entity";
import {PoliceService} from "../../services/police.service";
import {PoliceStationDTO} from "../../interface/police.entity";

@Component({
  selector: 'app-police',
  standalone: true,
  imports: [],
  templateUrl: './police.component.html',
  styleUrl: './police.component.scss'
})
export class PoliceComponent {

  policeService=inject(PoliceService)
  policeStationDTOS:PoliceStationDTO[]=[]

  constructor() {
    effect(() => {
      this.policeStationDTOS=this.policeService.all()
    });
  }
}
