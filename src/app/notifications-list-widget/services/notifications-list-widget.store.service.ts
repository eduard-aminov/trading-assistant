import { Injectable } from '@angular/core';
import { Store } from '../../core/abstract/store.abstract';
import { NotificationsListWidgetState } from '../interfaces/notifications-list-widget.interface';
import { NotificationsListWidgetItem } from '../models/notifications-list-widget.model';

const initialState: NotificationsListWidgetState = {
  notifications: [],
  isNotificationsLoading: true,
  isNotificationsEmpty: true,
};

@Injectable()
export class NotificationsListWidgetStoreService extends Store<NotificationsListWidgetState> {
  constructor() {
    super(initialState);
  }

  public addNotification(notification: NotificationsListWidgetItem): void {
    this.setState({notifications: [...this.stateSnapshot.notifications, notification]});
  }
}
