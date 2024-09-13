import {Component, effect, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../interface/user.entity";
import {HospitalService} from "../../services/hospital.service";
import {HospitalDTO} from "../../interface/hospital.entity";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-hospital',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule
    ],
    templateUrl: './hospital.component.html',
    styleUrl: './hospital.component.scss'
})
export class HospitalComponent {

    hospitalService = inject(HospitalService)
    hospitalDTOS: HospitalDTO[] = []

    hospitalId = signal(0)


    createHospital = {
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
            this.hospitalDTOS = this.hospitalService.all()
        });
        effect(() => {
            const hospital = this.hospitalService.active()
            if (hospital) {
                this.hospitalId.set(hospital.hospitalId)
                this.createHospital.name = hospital.hospitalName
                this.createHospital.code = hospital.hospitalCode
                this.createHospital.contactNumber = hospital.contactNumber
                this.createHospital.city = hospital.city
                this.createHospital.district = hospital.district
                this.createHospital.province = hospital.province
                this.createHospital.areaCovered = hospital.coverdArea
            }
        }, {allowSignalWrites: true});
    }

    getById(id: number) {
        this.hospitalService.getById(id.toString()).subscribe({
            next: (response) => {
                console.log(response)
            },
            error: (err: any) => {
                console.error(err);
            }
        })
    }

    update() {
        if(this.hospitalId() >0){
            this.hospitalService.update(this.hospitalId(), this.createHospital).subscribe(
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
        }
        else {
            this.hospitalService.create(this.createHospital).subscribe({
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

    downClick() {
        this.createHospital = {
            code: '',
            name: '',
            contactNumber: '',
            city: '',
            district: '',
            province: '',
            areaCovered: '',
        }
        this.hospitalId.set(-1)
        this.hospitalService.initial()
    }

}
