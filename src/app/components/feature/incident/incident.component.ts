import {Component, effect, inject, Injector, signal} from '@angular/core';
import {IncidentService} from "../../services/incident.service";
import {IncidentDto} from "../../interface/incident.entity";
import {UserService} from "../../services/user.service";
import {HospitalService} from "../../services/hospital.service";
import {HospitalDTO} from "../../interface/hospital.entity";
import {FireDTO} from "../../interface/fire.entity";
import {FireService} from "../../services/fire.service";
import {InsuranceService} from "../../services/insurance.service";
import {InsuranceDto} from "../../interface/insruance.entity";
import {PoliceService} from "../../services/police.service";
import {PoliceStationDTO} from "../../interface/police.entity";
import {FormsModule} from "@angular/forms";
import {ResponseService} from "../../services/response.service";

@Component({
    selector: 'app-incident',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './incident.component.html',
    styleUrl: './incident.component.scss'
})
export class IncidentComponent {

    incidentService = inject(IncidentService)
    userService = inject(UserService)
    incidentDtos: IncidentDto[] = []
    hospitalService = inject(HospitalService)
    fireDTOS: FireDTO[] = [];
    insuranceService = inject(InsuranceService)
    rensponseService= inject(ResponseService)
    insuranceDto: InsuranceDto[] = []
    fireService = inject(FireService)
    hospitalDTOS: HospitalDTO[] = []
    policeService = inject(PoliceService)
    policeStationDTOS: PoliceStationDTO[] = []
    userId = 0;
    Username = '';
    personName = '';
    vehicleNumber? = '';
  incidentId = signal(0);

    constructor() {
        effect(() => {
            this.incidentDtos = this.incidentService.all()
            this.hospitalDTOS = this.hospitalService.all()
            this.fireDTOS = this.fireService.all()
            this.insuranceDto = this.insuranceService.all()
            this.policeStationDTOS = this.policeService.all()
        });
        effect(() => {
            const user = this.userService.active()
            if (user) {
                this.Username = user.fullName
                this.personName = user.emergencyPerson.personName
                this.vehicleNumber = user.vehicle?.vehicleNumber
            }
            const accident = this.incidentService.active()
            if (accident) {
              this.incidentId.set(accident.id)
            }
        },{allowSignalWrites:true});
    }

    createResponse = {
        responseStatus: '',
        responseTime: '',
        incidentId: '',
        policeDepartmentId: '',
        fireDepartmentId: '',
        hospitalDepartmentId: '',

    }

    get(id: number,accId:number) {
        this.userService.getById(id.toString(), true).subscribe({
            next: (result) => {
                console.log(result)
            }
        })
      this.incidentService.getById(accId.toString(),true).subscribe({
        next: (result) => {
          console.log(result)
          this.createResponse.incidentId=accId.toString();
        }
      })
    }


    create(){
      const responseDto={
        responseStatus:this.createResponse.responseStatus,
        responseTime: Number(this.createResponse.responseTime),
        incidentId: Number(this.createResponse.incidentId),
        policeDepartmentId: Number(this.createResponse.policeDepartmentId),
        fireDepartmentId: Number(this.createResponse.fireDepartmentId),
        hospitalDepartmentId: 20,
        
      }
      this.rensponseService.create(responseDto).subscribe({
        next: (result) => {
          console.log(result)
          window.location.reload()
          window.alert('Send  the Response for that accident')
        }
      })
      
      
    }


}
