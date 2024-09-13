import {Component, effect, inject, OnInit} from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {HospitalDTO} from "../../interface/hospital.entity";
import {PoliceService} from "../../services/police.service";
import {PoliceStationDTO} from "../../interface/police.entity";
import {FormsModule} from "@angular/forms";
import {APIResponse} from "../../../core";

@Component({
  selector: 'app-police',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './police.component.html',
  styleUrl: './police.component.scss'
})
export class PoliceComponent implements OnInit {

  policeService=inject(PoliceService)
  policeStationDTOS:PoliceStationDTO[]=[]
  policeStations: PoliceStationDTO[] = [];
  selectedStation: PoliceStationDTO = {} as PoliceStationDTO;

  constructor() {
    effect(() => {
      this.policeStationDTOS=this.policeService.all()
    });
  }

  ngOnInit() {
    this.loadPoliceStations();
  }

  loadPoliceStations() {
    this.policeService.getAll().subscribe(
        (response: APIResponse<PoliceStationDTO[]>) => {
          if (response.data) {
            this.policeStations = response.data;
            if (this.policeStations.length > 0) {
              this.selectStation(this.policeStations[0]);
            }
          } else {
            console.error('No data received from API');
          }
        },
        (error) => console.error('Error loading police stations:', error)
    );
  }

  selectStation(station: PoliceStationDTO) {
    this.selectedStation = { ...station };
  }

  onSubmit() {
  }
}
