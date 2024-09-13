
import {Component, effect, inject, signal} from '@angular/core';

import {Component, effect, inject, OnInit} from '@angular/core';

import {HospitalService} from "../../services/hospital.service";
import {HospitalDTO} from "../../interface/hospital.entity";
import {PoliceService} from "../../services/police.service";
import {PoliceStationDTO} from "../../interface/police.entity";
import {FormsModule} from "@angular/forms";


@Component({
    selector: 'app-police',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './police.component.html',
    styleUrl: './police.component.scss'

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


    policeService = inject(PoliceService)
    policeStationDTOS: PoliceStationDTO[] = []

    policeId = signal(0)


    policeDTO = {
        code: '',
        name: '',
        contactNumber: '',
        city: '',
        district: '',
        province: '',
        areaCovered: '',
    }

    constructor() {
        effect(() => {
            this.policeStationDTOS = this.policeService.all()
        });
        effect(() => {
            const police = this.policeService.active()
            if (police) {
                this.policeId.set(police.policeId)
                this.policeDTO.name = police.PoliceName
                this.policeDTO.code = police.PoliceCode
                this.policeDTO.contactNumber = police.contactNumber
                this.policeDTO.city = police.city
                this.policeDTO.district = police.district
                this.policeDTO.province = police.province
                this.policeDTO.areaCovered = police.areaCovered
            }
        }, {allowSignalWrites: true});


    }

    getById(id: number) {
        this.policeService.getById(id.toString()).subscribe({
            next: (response) => {
                console.log(response)
            },
            error: (err: any) => {
                console.error(err);

            }
        })
    }

    downClick() {
        this.policeDTO = {
            code: '',
            name: '',
            contactNumber: '',
            city: '',
            district: '',
            province: '',
            areaCovered: '',
        }
        this.policeId.set(-1)
        this.policeService.initial()
    }

    update() {

        if (this.policeId() > 0) {
            this.policeService.update(this.policeId(), this.policeDTO).subscribe(
                {
                    next: gatePass => {
                        window.location.reload();
                        console.log(gatePass)
                    },
                    error: err => {

                        console.error(err);
                    }
                }
            )
        } else {
            this.policeService.create(this.policeDTO).subscribe({
                next: (response) => {
                    console.log(response)
                    window.location.reload();
                },
                error: (err: any) => {
                    console.error(err);
                }
            })

        }


    }



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
