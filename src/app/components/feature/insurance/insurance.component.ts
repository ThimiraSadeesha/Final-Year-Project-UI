import {Component, effect, inject} from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {HospitalDTO} from "../../interface/hospital.entity";

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [],
  templateUrl: './insurance.component.html',
  styleUrl: './insurance.component.scss'
})
export class InsuranceComponent {


  hospitalService=inject(HospitalService)
  hospitalDTOS:HospitalDTO[]=[]

  constructor() {
    effect(() => {
      this.hospitalDTOS=this.hospitalService.all()
    });
  }
}
