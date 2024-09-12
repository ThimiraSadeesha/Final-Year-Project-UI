import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../services";
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  showError: boolean = false;
  private querySub: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.querySub = this.activatedRoute.queryParams.subscribe(params => {
      const keyValue = params['auth-key'];
      console.log(keyValue)
      if (keyValue) {
        this.authService.signIn(keyValue).subscribe(
          response => {
            console.log('Login successful', response);
            this.showError = false;
          },
          error => {
            console.error('Login failed', error);
            this.triggerError();
          }
        );
      }
    });
  }

  triggerError() {
    this.showError = false;
    setTimeout(() => this.showError = true, 0);
  }

  ngOnDestroy() {
    if (this.querySub)
      this.querySub.unsubscribe();
  }

}
