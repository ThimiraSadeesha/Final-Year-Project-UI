import {computed, Injectable, signal} from '@angular/core';

export type NotificationType = 'success' | 'error' | 'alert' | 'confirm';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timeout?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSignal = signal<Notification | null>(null);
  public notification = computed(() => this.notificationSignal());

  private defaultTimeout = 5000;
  private timeoutId: number | null = null;

  showNotification(notification: Omit<Notification, 'id'>): string {
    const id = this.generateId();
    const fullNotification: Notification = { ...notification, id };

    this.notificationSignal.set(fullNotification);

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    if (notification.timeout !== 0) {
      this.timeoutId = window.setTimeout(() => {
        this.clearNotification(id);
      }, notification.timeout || this.defaultTimeout);
    }

    return id;
  }

  clearNotification(id: string) {
    const currentNotification = this.notificationSignal();
    if (currentNotification && currentNotification.id === id) {
      this.notificationSignal.set(null);
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
