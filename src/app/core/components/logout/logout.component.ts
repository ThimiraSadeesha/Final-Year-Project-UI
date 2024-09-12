import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {


  constructor(
    private router: Router,
    private authService: AuthService) { }

  get logout() {
    return faArrowRightFromBracket;
  }

  logOut() {
    this.authService.userSignOut()
  }
}
