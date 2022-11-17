import { NotificationsListWidgetItem } from '../models/notifications-list-widget.model';

export interface NotificationsListWidgetState {
  notifications: NotificationsListWidgetItem[];
  isNotificationsLoading: boolean;
  isNotificationsEmpty: boolean;
}
