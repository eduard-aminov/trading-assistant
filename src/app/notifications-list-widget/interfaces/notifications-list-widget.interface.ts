import {
  NotificationsListWidgetMarket,
  NotificationsListWidgetNotification
} from '../models/notifications-list-widget.model';

export interface NotificationsListWidgetState {
  markets: NotificationsListWidgetMarket[];
  notifications: NotificationsListWidgetNotification[];
  isNotificationsLoading: boolean;
  isNotificationsEmpty: boolean;
}
