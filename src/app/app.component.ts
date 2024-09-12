import {Component, computed, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {initFlowbite} from 'flowbite';
import {Subscription} from "rxjs";
import {LoadingService, NotificationService} from "./components";
import {DotLoadingServices} from "./core";
import {DotAnimationComponent} from "./core/components/loading/dot-animation/dot-animation.component";
import {NotificationAlertComponent} from "./core/components/notification/notification-alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DotAnimationComponent, NotificationAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit ,OnDestroy{

  currentNotification = computed(() => this.notificationService.notification());
  private subscriptions: Subscription = new Subscription();
  title = 'Production Tracking System';
  isLoading = computed(() => this.dotLoadingServices.isLoading());

  isLoginPage: boolean = false;

  constructor(
      private loadingService: LoadingService,
      private router: Router,
      public dotLoadingServices: DotLoadingServices,
      private notificationService: NotificationService,
  ) {}


  ngOnInit(): void {
    initFlowbite();

    this.subscriptions.add(
        this.loadingService.isLoading.subscribe((isLoading) => {
          this.dotLoadingServices.setLoading(isLoading);
        })
    );

    this.subscriptions.add(
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.isLoginPage = this.router.url.includes('/login');
          }
        })
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  clearNotification() {
    const notification = this.currentNotification();
    if (notification) {
      this.notificationService.clearNotification(notification.id);
    }
  }
}
