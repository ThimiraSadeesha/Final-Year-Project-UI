import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../interface/user.entity";
import {FireService} from "../../services/fire.service";
import {FireDTO} from "../../interface/fire.entity";
import {FormsModule} from "@angular/forms";
import {HospitalService} from "../../services/hospital.service";
import {HospitalDTO} from "../../interface/hospital.entity";

@Component({
  selector: 'app-fire-service',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './fire-service.component.html',
  styleUrl: './fire-service.component.scss'
})
export class FireServiceComponent {
  fireDTOS: FireDTO[] = [];

  fireService = inject(FireService)


  fireId = signal(0)

  createFire = {
    fireCode: '',
    fireName: '',
    contactNumber: '',
    city: '',
    district: '',
    province: '',
    areaCovered: '',
  }


  constructor() {
    effect(() => {
      this.fireDTOS = this.fireService.all()
    });
    effect(() => {
      const hospital = this.fireService.active()
      if (hospital) {
        this.fireId.set(hospital.fireId)
        this.createFire.fireName = hospital.fireName
        this.createFire.fireCode = hospital.firelCode
        this.createFire.contactNumber = hospital.contactNumber
        this.createFire.city = hospital.city
        this.createFire.district = hospital.district
        this.createFire.province = hospital.province
        this.createFire.areaCovered = hospital.coverdArea
      }
    }, {allowSignalWrites: true});
  }

  getById(id: number) {
    this.fireService.getById(id.toString()).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  downClick() {
    this.createFire = {
      fireCode: '',
      fireName: '',
      contactNumber: '',
      city: '',
      district: '',
      province: '',
      areaCovered: '',
    }
    this.fireId.set(-1)
    this.fireService.initial()
  }

  update() {
    if(this.fireId() >0){
      this.fireService.update(this.fireId(), this.createFire).subscribe(
          {
            next: gatePass => {
              window.alert('Updated Fire department')
              window.location.reload();
              console.log(gatePass)
            },
            error: err => {
              console.error(err);
            }
          }
      )
    }
    else {
      this.fireService.create(this.createFire).subscribe({
        next: (response) => {
          console.log(response)
          window.alert('Saved Fire department')
          window.location.reload();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }

}