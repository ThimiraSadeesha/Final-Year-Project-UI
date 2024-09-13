import {Component, effect, inject, Injector} from '@angular/core';
import {IncidentService} from "../../services/incident.service";
import {IncidentDto} from "../../interface/incident.entity";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-incident',
  standalone: true,
  imports: [],
  templateUrl: './incident.component.html',
  styleUrl: './incident.component.scss'
})
export class IncidentComponent {


  incidentService = inject(IncidentService)
  userService = inject(UserService)
  incidentDtos:IncidentDto[]=[]
  userId=0;

  constructor() {
    effect(() => {
      this.incidentDtos=this.incidentService.all()
    });
    effect(() => {
      const accident=this.userService.active()
      if (accident){

      }
    });
  }

  get(id:number){
    this.userService.getById(id.toString(),true).subscribe({
      next: (result)=>{

      }
    })
  }



}
