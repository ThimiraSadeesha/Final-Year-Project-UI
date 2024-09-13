import {Component, effect, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../interface/user.entity";
import {FireService} from "../../services/fire.service";
import {FireDTO} from "../../interface/fire.entity";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-fire-service',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './fire-service.component.html',
  styleUrl: './fire-service.component.scss'
})
export class FireServiceComponent implements OnInit {
  fireDTOS: FireDTO[] = [];
  selectedStation: FireDTO = {} as FireDTO;

  constructor(private fireService: FireService) {
  }

  ngOnInit() {
    this.loadFireStations();
  }

  loadFireStations() {
    this.fireService.getAll().subscribe(
        (response) => {
          if (response.data) {
            this.fireDTOS = response.data;
            if (this.fireDTOS.length > 0) {
              this.selectStation(this.fireDTOS[0]);
            }
          } else {
            console.error('No data received from API');
          }
        },
        (error) => console.error('Error loading fire stations:', error)
    );
  }

  selectStation(station: FireDTO) {
    this.selectedStation = {...station};
  }

  onSubmit() {
    console.log('Form submitted:', this.selectedStation);
  }
}