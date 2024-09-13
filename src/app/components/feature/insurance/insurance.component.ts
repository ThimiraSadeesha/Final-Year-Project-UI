import {Component, effect, inject} from '@angular/core';

import {InsuranceDto} from "../../interface/insruance.entity";
import {InsuranceService} from "../../services/insurance.service";

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [],
  templateUrl: './insurance.component.html',
  styleUrl: './insurance.component.scss'
})
export class InsuranceComponent {


  insuranceService=inject(InsuranceService)
  insuranceDto:InsuranceDto[]=[]

  constructor() {
    effect(() => {
      this.insuranceDto=this.insuranceService.all()
    });
  }
}
