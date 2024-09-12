import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent {
  @Input() type!: 'success' | 'error' | 'alert' | 'confirm';
  @Input() message!: string;
}

